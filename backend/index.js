const express = require('express')
const dotenv = require('dotenv')
const userRouter = require('./Routes/UserRoutes')
const productrouter = require('./Routes/ProductRoutes')
const connection = require('./Dbconfig/Dbconn')

dotenv.config({path:'./config.env'})
const app = express()
app.use(express.json())
connection()

app.use(userRouter)
app.use(productrouter)

app.listen(process.env.PORT,()=>{
    console.log('api is listening',process.env.PORT)
})