import axios from "axios"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../Constants/Constants"

export const userLoginaction = (loginDetails) => async(dispatch) => {
    try{
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        const res = await axios.post("/api/v1/login",loginDetails)
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:res.data
        })
        if(res.status==200){
            alert(`${res.data.name} logged in successfully`)
        }else{
            alert(`${res.data.message}`)
        }
        localStorage.setItem('userinfo',JSON.stringify(res.data))
    }catch(error){
        alert('invalid login details')
        console.log(error)
    }
}

export const userLogoutAction = () => (dispatch)=>{
    localStorage.removeItem('userinfo')
    dispatch({
        type:USER_LOGOUT
    })
    
    
}