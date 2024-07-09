import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import ApiResponse from "../utils/ApiResponse.js"



const registerUser = asyncHandler(async (req,res)=>{
    const {fullName,email,userName,password}= req.body
    console.log("email: ", email);

    // if(fullName === ""){
    //     throw new ApiError(400,"Fullname is required")
    // }
     
    if([fullName,email,userName,password].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"All fields are required")
    } 

    //we can also use this type of method to check all the element on a same time if we didn't want this then we also use individuall if conditionn for a element individually

    //to check the user is already login or not 

    const existedUser = await User.findOne({
        $or:[{userName},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User already exists")
    }

    console.log(req.files);
    const avatarLocalPath = req.files?.avatar[0].path; //we can also use req.file.path to get the path of the file

    const coverImageLocalPath = req.files?.coverImage?.[0]?.path; //we can also use req.file.path to get the path of the file
    //we can also use req.files?.coverImage[0].path; to get the path

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is required")
    }


    const avatar = await uploadOnCloudinary (avatarLocalPath)

    const coverImage = await uploadOnCloudinary (coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar is required")
    }


    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        userName : userName.toLowerCase(),
        password
    })


    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createUser){

        throw new ApiError(500,"something went worng! sorry")
    }

       return res.status(201).json(
        new ApiResponse(200, createUser, "User registered successfully")
       ) 

    })

export  {registerUser} 