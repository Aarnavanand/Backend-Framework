import dotenv from "dotenv"
import connectDB from "./db/index.js";
// import express from "express"
// const app = express()
import app  from "./app.js"

dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.on("error" , (err)=>{
        console.log(`error befor port listening ${err}`)
        throw err
    })
    app.listen(process.env.port||8000,()=>{
        console.log(`server is running on port ${process.env.port}`)
    })
})
    .catch((err)=>{
    console.log(`Error ${err}`)
})













// import express from "express";
// import mongoose from "mongoose";
// import {DB_NAME} from "./constants";
// const app = express()


// ;(async()=>{
//    try{
//     await mongoose.connect(`
//         ${
//             process.env.MONGODB_URI}/${DB_NAME}`)
//             app.on("error",(error)=>{
//                 console.log("This error is for sometimes express doesn't work so it will give error for express connectivity ",error);
//                 throw error
//             })
//             app.listen(process.env.PORT,()=>{
//                 console.log(`Server is running on port ${process.env.PORT}`);
//             })
//    }
//    catch(error){
//     console.error("ERROR:",error)
//     throw error
//    } 
// })()