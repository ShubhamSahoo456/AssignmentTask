const mongoose = require('mongoose')

const connection = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_CONN,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('connection successful')
    }catch(error){
        console.log(error)
    }
}

module.exports = connection