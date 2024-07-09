import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'//jwt is a weard token means jiske pass bhi bhi ye token hoga use main data bhej dunga 
//it is just a key of my data if anybody has this token then it is able to acccess my data 


import bcrypt from 'bcryptjs'//this is a password encryption 

const userSchema = new Schema(
    {
        userName :{
            type: String,
            required: true,
            unique: true,
            lowercase : true,
            trim : true,
            index : true
        },
        email :{
            type : String,
            required : true,
            unique : true,
            lowercase : true,
        },
        fullName :{
            type: String,
            required: true,
            trim : true,
            index : true
        },
        avatar:{
            type: String,
            required: true,
        },
        coverImage :{
            type: String
        },
        watchHistory :[
            {
                type: Schema.Types.ObjectId,
                ref: 'Video'
            }
        ],
        password:{
            type: String,
            required : [true, 'Password is required']
        },
        refreshToken:{
            type: String,
        }
},{
    timestamps: true
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password= await bcrypt.hash(this.password,10)
    next()
})//pre method is use for ki ye kam karne se just pahle mujhe ye kam karke do toh save hone se agar password modify kiye hai toh usne encrpt kar do 

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}//ye custom method hai jo check karega ki password sahi hai ya nahi compare karega password ko or encreypted password ko
//ye compare true/false value bhejte hai  

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username: this.username,
        fullname:this.fullname
    },
    
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
})}//ye method hai jo access token generate karega

userSchema.method.generateRefeshToken = function(){
    return jwt.sign({
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
})}//ye method hai jo refresh token generate karega

export const User = mongoose.model("User",userSchema); 