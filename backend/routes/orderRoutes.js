import express from 'express'
const router = express.Router();
import {addOrder,getOrderById,updateOrderToPaid,getMyOrders} from '../controllers/OrderController.js'
import {protect} from '../utils/authMiddleware.js'

// @description : add order to /orders
router.route('/').post(protect,addOrder)
// @description : get logged in user orders
router.route("/myorders").get(protect,getMyOrders);

// @description : fetch single order by id
router.route("/:id").get(protect,getOrderById);

// @description : update single order status to paid
router.route("/:id/pay").put(protect,updateOrderToPaid);






export default router