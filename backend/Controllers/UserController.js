const User = require('../Models/UserModel')
const Product = require('../Models/Productmodel')
const bcrypt = require('bcrypt')
const AuthToken = require('../Middlewares/GenerateToken')

const registeruser = async (req,res) => {
    try{
        const {email} = req.body
        const uniqueEmail = await User.findOne({email:email})

        if(uniqueEmail){
            res.json({message:"email id already exists"})
        }else{
            const registeruser = await User.create(req.body)
            if(registeruser){
                res.status(200).json({
                    message:"Registration successfully",
                    email:registeruser.email,
                    firstname:registeruser.firstname,
                    lastname:registeruser.lastname,
                    gender:registeruser.gender
                })
            }else{
                res.status(404).json({messaage:"unable to register"})
            }
        }
    }catch(error){
        console.log(error)
    }
}

const loginUser = async (req,res)=>{
    try{
        const {email ,password} = req.body
        const findEmail = await User.findOne({email})
        if(findEmail){
            const verifyPassword = await bcrypt.compare(password,findEmail.password)
            if(verifyPassword){
                res.status(200).json({message:'login successfully',token:await AuthToken(findEmail._id),name:findEmail.firstname})
            }else{
                res.status(404).json({message:"invalid login details"})
            }
        }else{
            res.status(404).json({message:"invalid login details"})
        }
    }catch(error){
        console.log(error)
    }
}

module.exports={
    registeruser,
    loginUser
}