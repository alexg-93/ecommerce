import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import AsyncHandler from 'express-async-handler'

export const protect = AsyncHandler(async (req, res, next) => {

    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            const {id} = decoded
            req.user = await User.findById(id).select('-password')

            next()
        } catch (err) {
   
          res.status(401).json({
              message:'Not authrized , invalid token',
              error: err
          })
        }
    }else{
        res.json({
            status:401,
            message:'Not authorized, no token'
        })
    }


   
})

export const isAdmin = (req,res,next) => {
  if(req.user && req.user.isAdmin){
      next()
  }else{
    res.status(401).json({
          message:"Not authorized as an admin"
      })
    console.log(`Error ${res.statusCode} not authorized as an admin`)
  }
}