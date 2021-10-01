import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// @description : fetch all products
// @route :  action --> GET /api/products
// @access   Public
export const getProducts = asyncHandler(async(req,res) =>{
    const products = await Product.find({});
    res.json({
      message: "API is OK :) ",
      products: products,
    });
})

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

// @description : delete single product by id
// @route :  action --> DELETE /api/products/:id
// @access   Private <ADMIN ONLY>
export const deleteProduct = asyncHandler(async(req,res) =>{

  const product = await Product.findById(req.params.id);
 
   if(product){
    await Product.deleteOne(product)
    res.json({
      message:"Product deleted successfully"
    })
  }else{
    res.status(404).json({
      message: "Product not found"
    })
    
  }

});

// @description : create single product
// @route :  action --> POST /api/products
// @access   Private <ADMIN ONLY>
export const createProduct = asyncHandler(async(req,res) =>{

  const {name,price,countInStock,image,description,brand,category,rating} = req.body;
  const productExist = await Product.findOne({name});

  //check if product already registered
  if(productExist){
    res.status(400).json({
      message:'this Product already exists'
    })
  }else{
    //sign new product to database
    const newProduct = await Product.create({
      user:req.user._id,
      name,
      price,
      countInStock,
      image,
      description,
      brand,
      category,
      rating:0,
      numReviews:0
    })
  
   //check if new product is created
    if(newProduct){
      const createdProduct = await newProduct.save();
      res.status(201).json({
        message:'Product created successfully',
        product:createdProduct
      })
    }else{
      res.status(400).json({
        message:'Invalid Product data'
      })
    }
  }
 

});

// @description : edit single product
// @route :  action --> PUT /api/products/:id
// @access   Private <ADMIN ONLY>
export const updateProduct = asyncHandler(async(req,res) =>{

  const {name,price,countInStock,image,description,brand,category} = req.body;
  const product = await Product.findById(req.params.id);

  if(product){

      product.name = name
      product.price = price
      product.countInStock = countInStock
      product.image = image
      product.description = description
      product.brand = brand
      product.category = category

  
      const updatedProduct = await product.save()
      let updatedAt = new Date
      res.json({
        message:"product updated successfully",
        _id: product._id,
        updatedProduct : updatedProduct,
        updatedAt : updatedAt.toString()
      })

  }else{
    res.status(404).json({
      message: "Product not found"
    })
  }

})








