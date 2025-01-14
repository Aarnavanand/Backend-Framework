import moongose from "mongoose";
import { DB_NAME } from "../constants.js" 

const connectDB = async() =>{
   try{
    const connectionInstance = await moongose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
   }
   catch(err){
    console.log(`MONGODB connection error: ${err}`);
    process.exit(1)
   }
}

export default connectDB