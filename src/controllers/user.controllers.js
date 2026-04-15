import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/ayncHandler.js";
import { User } from '../models/user.model.js'
import { uploadCloudinary } from "../utils/cloudinary.js";
import { application } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
   res.status(200).json({
      message: "ok"
   })

   const { fullName, userName, password, email } = req.body
   console.log('email: ', email)

   if ([fullName, userName, password, email].some((field) => field?.trim() === "")) {
      throw new ApiError(400, 'All fields are required')
   }

   const existedUser = User.findOne({
      $or: [{ userName }, { email }]
   })

   if (existedUser) {
      throw new ApiError(409, 'User with email or username already exists')
   }

   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocaPath = req.files?.coverImage[0]?.path;

   if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required")
   }

   const avatar = await uploadCloudinary(avatarLocalPath)
   const coverImage = await uploadCloudinary(coverImageLocaPath)

   if (!avatar) {
      throw new ApiError(400, "Avatar file is required")
   }

   const user = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || '',
      email,
      password,
      userName: userName.toLowerCase()
   })
 
   const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
   )

   if(createdUser){
      throw new ApiError(500< 'something went wrong while registering user')
   }

   return res.status(201).json(
      new ApiResponse(200, createdUser, "User register successful ly")
   )
})

export { registerUser }