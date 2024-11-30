import express from 'express';
import mongoose from 'mongoose';
import { User } from '../models/userModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApirError.js'
import {ApiResponse} from '../utils/ApiResponse.js'

import jwt from 'jsonwebtoken';
import { verfiyJwt } from './verifyjwt.js';

const options = {
  httpOnly: true,
  secure: true,
};

const generateAccessAndRefreshToken = async (passedUser) => {
  try {
    const user = await User.findById(passedUser._id);
    const accessToken = await user.accessTokenGenerator();
    const refreshToken = await user.refreshTokenGenerator();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const register = asyncHandler (async (req, res) => {
  const {  username, password, email } = req.body;

  if (!username || !email || !password) {
    console.log(password);
    console.log(email);
    console.log(username);
    
    
    
    throw new ApiError(409, 'All fields are required.');
  }

  if (await User.findOne({ $or: [{ username }, { email }] })) {
    throw new ApiError(409, 'User exists with the email or username');
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select('-password -refreshToken');
  if (!createdUser) {
    throw new ApiError(500, 'Could not create the user');
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, 'Registered successfully')
  );
});

const login = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ $or: [{ email }] });
  if (!user) {
    throw new ApiError(409, 'No user with the provided email exists');
  }

  if (await user.isPasswordCorrect(password)) {
    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user);
    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');
    
    return res.status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json(
        new ApiResponse(200, {
          user: loggedInUser,
          accessToken,
          refreshToken,
        }, 'User logged in successfully')
      );
  } else {
    throw new ApiError(408, 'Password incorrect');
  }
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $set: { refreshToken: undefined },
  }, { new: true });

  return res.status(200)
    .cookie('accessToken', '', options)
    .cookie('refreshToken', '', options)
    .json(new ApiResponse(200, {}, 'User logged out successfully'));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, 'Unauthorized request');
  }

  const response = jwt.decode(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const user = await User.findById(response?.id);

  const accessToken = await user.accessTokenGenerator();
  const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

  return res.status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(200, {
        user: loggedInUser,
        accessToken,
        refreshToken,
      }, 'Access token refreshed successfully')
    );
});


const userRouter = express.Router();

userRouter.route("/register").post(register)


userRouter.route("/login").post(login)

userRouter.route("/logout").post(
   verfiyJwt,
   logout,   
)


userRouter.route("/refreshAccessToken").post(refreshAccessToken)



export {
userRouter
};
