const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

userSchema.pre('save',async function(next){
    try{
        if(this.isModified('password')){
            this.password =await bcrypt.hash(this.password,12)
        }
        next()
    }catch(error){
        console.log(error)
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User