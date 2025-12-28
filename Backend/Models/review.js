import mongoose from "mongoose";
import Product from "./product.js";

const reviewSchema = new mongoose.Schema(
  {
    //which user have wrote the review?
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    //review is of which product?
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    rating: {
      type: Number,
      min: [1, "Rating must be atleast 1.0"],
      max: [5, "Rating must be atmost 5.0"],
    },
    comment: {
      type: String,
      required: [true, "Please enter your review"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//one User should write only one review so,
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

//instance can be called anywhere in the document, we use
//statics because we are calling it in model
//LOGIC TO CALCULATE AVERAGE RATING
reviewSchema.statics.calculateAverageRating = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group:{
        _id:"$product",
        nRating:{$sum:1},
        avgRating:{$avg:"$rating"} //rating field from review schema
      }
    }
  ]);
    // console.log(stats);
  /*
  [
  {
    _id: new ObjectId('68e542359189b46e44c79b78'),
    nRating: 3,
    avgRating: 3.6666666666666665
  }
]
  stored in array so we need to access the first position using [0]
  */

  await Product.findByIdAndUpdate(productId,{
    ratingsAverage:stats[0]?stats[0].avgRating:0,
    ratingsQuantity:stats[0]?stats[0].nRating:0
  })
};

//works only for create , doesn't work for update and delete
reviewSchema.post("save",function(){
   //this points to the current document after being saved
  this.constructor.calculateAverageRating(this.product); //this.constructor === Review
})


//we'll have to make it work for findByIdAndUpdate and findByIdAnddelete
//this is query middleware, here we don't have direct accesss to document 
//this. points to the query 
//findbyidandupdate(reviewId,updatedData)
//getQuery returns reviewId
reviewSchema.pre(/^findOneAnd/,async function (){
  const r = await this.modal.findOne(this.getQuery())
  //this.getQuery gives us the id of document that is going to be updated or deleted
  this.r=r
  //we will have to pass the data to post middleware, becuase pre runs before saving to the database, 
  //calculating here will lead to errors, as previous data will still be there
})

//now we use post middleware to calculate the average rating
reviewSchema.post(/^findOneAnd/,async function(){
  //this.r is the documet that we have passed from pre middleware
  //this.r.constructor === Review 
  await this.r.constructor.calculateAverageRating(this.r.product);
})

const Review = mongoose.model("Review", reviewSchema);

export default Review;
