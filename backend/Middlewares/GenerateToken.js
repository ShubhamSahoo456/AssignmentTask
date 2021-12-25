const jwt = require('jsonwebtoken')

const AuthToken = async (id)=>{
    try{
        const token = await jwt.sign({_id:id},process.env.SECRET_KEY,{
            expiresIn:'15d'
        })

        return token

    }catch(error){
        console.log(error)
    }
}

module.exports = AuthToken