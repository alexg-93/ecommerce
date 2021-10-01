import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from '../utils/generateToken.js'


// @description : fetch all users
// @route :  action --> GET /api/users
// @access   Public
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json({
    message: "API is OK :) ",
    users: users,
  });
});

// @description : fetch single product by id
// @route :  action --> GET /api/users/:id
// @access   Public
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  user ? res.json({
        user: user,
      })
    : res.status(404).json({
        status: res.statusCode,
        message: `User not found for id = ${req.params.id}`,
      });
});

//@description : Auth user and get token
//@route POST /api/users/login
//@access Public

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });


  user && (await user.matchPassword(password))
  
    ? res.json({
        _id: user._id,
        name:user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
    
        
      })
      
    : res.status(401).json({ message: "Invalid email or password" });

   
  
    
});

//@description : get user profile (logged in user)
//@route POST /api/users/profile
//@access Private

export const getUserProfile  = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const user = await User.findById(_id);
  
    
    if(user){
        res.json({
          _id: user._id,
          name:user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        })
    }else{
      res.status(404).json({
        message: "User not found"
      })
    }

});


//@description : Register a new user
//@route POST /api/users
//@access Public

export const registerUser = asyncHandler(async (req, res) => {
  const { name,email, password } = req.body;

  const userExist = await User.findOne({ email });

  //check if user already registered
  if(userExist){
    res.status(400).json({
      message:'User already exists'
    })
  }else{
    const newUser = await User.create({
      name,
      email,
      password
    })

    if(newUser){
      res.status(201).json({
        message:'User registered successfully',
        _id: newUser._id,
        name:newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: generateToken(newUser._id)
      })
    }else{
      res.status(400).json({
        message:'Invalid user data'
      })
    }
  }

 
});

//@description : update user profile
//@route PUT /api/users/profile
//@access Private

export const updateUserProfile  = asyncHandler(async (req, res) => {
  const {_id} = req.user
  const user = await User.findById(_id);

  
  if(user){
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if(req.body.password){
        user.password=req.body.password
      }

      const updatedUser = await user.save()

      res.json({
        _id: user._id,
        name:updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
    
        
      })

  }else{
    res.status(404).json({
      message: "User not found"
    })
  }

});


// @description : fetch all users 
// @route :  action --> GET /api/users
// @access   Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json({
    message: "success",
    users: users,
  });
});

// @description : delete User by ID
// @route :  action --> DELETE /api/users/:id
// @access   Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id)
  if(user){
    await User.deleteOne(user)
    res.json({
      message:"User deleted"
    })
  }else{
    res.status(404).json({
      message: "User not found"
    })
  }
 
});



//@description : update users profile by userID
//@route PUT /api/users/:id
//@access Private/Admin

export const updateUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id);

  if(user){

      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin

      const updatedUser = await user.save()

      res.json({
        _id: user._id,
        name:updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin, 
      })

  }else{
    res.status(404).json({
      message: "User not found"
    })
  }

});


