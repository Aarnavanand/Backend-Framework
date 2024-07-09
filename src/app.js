import express from "express"
const app = express()
import cors from "cors"
import cookieParser from "cookie-parser"



//app.use is use for middalware or for config file setup 

app.use(cors(
    {
        origin : process.env.CORS_ORIGIN,
        credentials :true
    }))

app.use(express.json({
    limit: "16kb"
}))//it accept the json 
app.use(express.urlencoded({
    extended:true,limit:"16kb"
}))//it use for url acceptance -> entended means we can pass url inside a url object inside a object nested object 
app.use(express.static("public"))//it will access public folder to access assets pics files etc
app.use(cookieParser())//it will acess server cokkie or read user cokkie by server 

//routes
import userRoute from './routes/user.route.js'
//http://localhost:8000/users/register
////http://localhost:8000/users/login
//http://localhost:8000/users/logout   
//app.use("/users",user) ->it will use user.js file and it will use all the routes

//routes declaration 
app.use("/api/v1/users",userRoute) 

export default app;