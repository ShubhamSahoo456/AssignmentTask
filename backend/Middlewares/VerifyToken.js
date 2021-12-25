const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

const Tokenverify = async (req,res,next) => {
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
            let decoded = await jwt.verify(token,process.env.SECRET_KEY)
            req.user = await User.findById({_id:decoded._id})
            next()
        }
    }catch(error){
        console.log(error)
    }
}

module.exports = Tokenverify