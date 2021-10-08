
import mongoose from 'mongoose'
import Review from './reviewModel.js'

const productSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectID,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
     
    },
    brand:{
        type:String,
        required:true,
    
    },
    category:{
        type:String,
        required:true,
      
    },
    description:{
        type:String,
        required:true,
      
    },
   //Child referencing
   reviews: [
    {
     type:Object,
      review: Review
    },
  ],
    rating:{
        type:Number,
        required:true,
        default:0
      
    },
    numReviews:{
        type:Number,
        required:true,
        default:0
      
    },
    price:{
        type:Number,
        required:true,
        default:0
      
    },
    countInStock:{
        type:Number,
        required:true,
        default:0
      
    },
  
},{
    timestamp:true
})

const Product = mongoose.model('Product',productSchema)

export default Product;