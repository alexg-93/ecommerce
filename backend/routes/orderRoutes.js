import express from 'express'
const router = express.Router();
import {addOrder,getOrderById,updateOrderToPaid,getMyOrders,getAllOrders,updateOrderToDelivered} from '../controllers/OrderController.js'
import {protect,isAdmin} from '../utils/authMiddleware.js'

// @description : add order to /orders
router.route('/')
.post(protect,isAdmin,addOrder)
.get(protect,isAdmin,getAllOrders)
// @description : get logged in user orders
router.route("/myorders").get(protect,getMyOrders);

// @description : fetch single order by id
router.route("/:id").get(protect,getOrderById);

// @description : update single order status to paid
router.route("/:id/pay").put(protect,isAdmin,updateOrderToPaid);

// @description : update single order staus to delivered

router.route("/:id/deliver").put(protect,isAdmin,updateOrderToDelivered)





export default router