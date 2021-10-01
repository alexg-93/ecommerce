import express from 'express'
const router = express.Router();
import {authUser,getUserProfile,registerUser ,updateUser,getUserById,updateUserProfile,getUsers,deleteUser} from '../controllers/userController.js'
import {protect,isAdmin} from '../utils/authMiddleware.js'


// @description : register new user / get all users
router.route('/').post(registerUser).get(protect,isAdmin,getUsers)
// @description : fetch single user by id

router.post("/login",authUser);

  
// @description : fetch logged in profile / update user profile

router.route('/profile')
.get(protect,getUserProfile)
.put(protect,updateUserProfile)

// @description : delete user/get user/update user
router.route("/:id")
.delete(protect,isAdmin,deleteUser)
.get(protect,isAdmin,getUserById)
.put(protect,isAdmin,updateUser)








export default router