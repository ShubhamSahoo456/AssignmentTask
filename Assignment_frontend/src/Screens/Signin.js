import React, { useEffect, useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import {userLoginaction} from '../Actions/Loginaction'

const Signin = ({history,location}) => {
    const[login , setLogin] = useState({
        email:"",
        password:""
    })

    const dispatch = useDispatch()
    const loginuser = useSelector(state=>state.userLogin)
    const {loading,error,userinfo} = loginuser

    const loginDetails = (e) => {
        const name = e.target.name
        setLogin({...login,[name]:e.target.value})
    }

    const signInUser = (e) => {
        e.preventDefault()
        dispatch(userLoginaction(login))

    }

    useEffect(()=>{
      console.log(location)
      if(userinfo){
        history.push("/dashboard")
      }
    },[userinfo,history,location])

  return (
    <>
      <div className="container sign_up">
        <div className="row h-100 w-100">
          <div className="col-sm-12 w-100 d-flex align-items-center justify-content-center">
            <form
              action="r"
              method="post"
              accept-charset="utf-8"
              className="form"
              role="form"
            >
              <div className="row">
                <div className="col-xs-12 col-md-12 my-3">
                  <input
                    type="text"
                    name="email"
                    value={login.email}
                    onChange={loginDetails}
                    className="form-control input-lg"
                    placeholder="Your Email"
                  />
                </div>
                <div className="col-xs-12 col-md-12 my-3">
                  <input
                    type="password"
                    name="password"
                    value={login.password}
                    onChange={loginDetails}
                    className="form-control input-lg "
                    placeholder="Password"
                  />
                </div>

                <br />
                <button className="btn btn-dark signup-btn my-2" type="submit" onClick={signInUser}>
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
