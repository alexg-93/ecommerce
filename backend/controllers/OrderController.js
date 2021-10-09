import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

// @description : create new order
// @route :  action --> POST /api/orders
// @access   Private
export const addOrder = asyncHandler(async (req, res) => {
  
  const {
  
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if(orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error("No order items")
      
  }else{

      const order = new Order({
        createdAt:Date.now(),
        orderItems,
        user:req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
    
      const createOrder = await order.save();
      res.status(201).json({
          message:"order created successfully",
          order:createOrder
      })
  }

});


// @description : get order by ID
// @route :  action --> GET /api/order/:id
// @access   Private
export const getOrderById = asyncHandler(async (req, res) => {

  const order = await Order.findById(req.params.id).populate('user','name email','User') // populate('path','fields in path','modelName')

   order ? res.json({
        order: order
      })
    : res.status(404).json({
        status: res.statusCode,
        message: `order not found for id = ${req.params.id}`,
      });
      // throw new Error('Order not found')
});


// @description : Update order to paid
// @route :  action --> GET /api/orders/:id/pay
// @access   Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {

  const order = await Order.findById(req.params.id)

   if(order){
     order.isPaid = true
     order.paidAt = Date.now()
     order.paymentResult = {
       id: req.body.id,
       status: req.body.status,
       update_time : req.body.update_time,
       email_address: req.body.payer.email_address
     }

     const updatedOrder = await order.save()
     res.json(updatedOrder)
     
    }
     else{
      res.status(404).json({
        status: res.statusCode,
        message: `order not found`,
      })
      throw new Error('Order not found!')
     }
   
});

// @description : Get logged in user orders
// @route :  action --> GET /api/orders/myorders
// @access   Private
export const getMyOrders = asyncHandler(async (req, res) => {
 
  const orders = await Order.find({user : req.user._id})
 
  res.json(orders)
   
});


// @description : fetch single product by id
// @route :  action --> GET /api/product/:id
// @access   Public
export const getProductById = asyncHandler(async(req,res) =>{
  const product = await Product.findById(req.params.id);
  product ? res.json({
        product
      })
    :
   
    res.status(404).json({
     status: res.statusCode,
     message :`Product not found for id = ${req.params.id}`

    })
})


// @description : fetch all clients orders
// @route :  action --> GET /api/orders
// @access   Private/Admin
export const getAllOrders = asyncHandler(async(req,res) =>{
  const orders = await Order.find({}).populate('user','name _id','User');
  if(orders){
    res.json({
      message: "Success fetching orders",
      orders
    });
  }else{
    res.status(404).json({
      status: res.statusCode,
      message: `Something went wrong`
    })
    throw new Error('Something went wrong')
  }


})

// @description : Update order status to delivered
// @route :  action --> GET /api/orders/:id/deliver
// @access   Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {

  const order = await Order.findById(req.params.id)

   if(order){
     order.isDelivered = true
     order.deliveredAt = Date.now()
    
     const updatedOrder = await order.save()
     res.json(updatedOrder)
     
    }
     else{
      res.status(404).json({
        status: res.statusCode,
        message: `order not found`,
      })
      throw new Error('Order not found!')
     }
   
});


