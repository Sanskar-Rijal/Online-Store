import Review from "../Models/review.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Product from "../Models/product.js";

//Create a new Review
const createReview = catchAsync(async (req, res, next) => {
  const { product, rating, comment } = req.body;

  const review = {
    user: req.user.id,
    product,
    rating: Number(rating),
    comment,
  };

  //1)now we search in which product this review is written
  const reviewForProduct = await Product.findById(product);
  if (!reviewForProduct) {
    return next(new AppError("No product found with this id", 404));
  }

  //2)now we create the review
  await Review.create(review);
  res.status(201).json({
    success: "true",
    message: "Review created successfully",
  });
});

//delete review
const deleteReview = catchAsync(async (req, res, next) => {
  const reviewId = req.params.id;
  //Check whether review is written by the current user or not
  const userId = req.user.id;
  // const review = await Review.findByIdAndDelete(reviewId);
  const review = await Review.findById(reviewId);
  if (review?.user?.toString() !== userId) {
    return next(new AppError("You cannot delete this review", 404));
  }
  //now delete the review safely
  await Review.findByIdAndDelete(reviewId);
  res.status(204).json({
    success: "true",
    message: "Review deleted successfully",
  });
});

//get all reveiws for a product
const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find().select("-__v");
  res.status(200).json({
    success: "true",
    message: reviews,
  });
});
export { createReview, deleteReview, getAllReviews };
