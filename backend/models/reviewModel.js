import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
         type: String,
          required: true
         },
    user:{
          type:mongoose.Schema.Types.ObjectID,
          required:true,
          ref:'User'
      },
      createdAt: {
        type:Date
      }
  },
  {
    timestamp: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
