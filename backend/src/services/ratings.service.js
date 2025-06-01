const Rating= require("../models/ratings.model");
const Review= require("../models/reviews.model");
const User= require("../models/user.model");
const Product= require("../models/product.model");

const productService=require("../services/product.service")  

async function createRatingReviews(req, user) {
    const { productId, rating, review } = req;

    const existingRating = await Rating.findOne({ product: productId, user: user._id });
    const existingReview = await Review.findOne({ product: productId, user: user._id });

    // console.log("existingRating",existingRating)
    // console.log("existingReview",existingReview)

    if (existingRating || existingReview) {
        // console.log("You already rated and reviewed this product")
       throw new Error("You already rated and reviewed this product");

    }

    const newRating = new Rating({
        product: productId,
        user: user._id,
        rating: rating,
        createdAt: new Date(),
    });
    
    await newRating.save();
    // console.log("newRating",newRating)

    
    const newReview = new Review({
        product: productId,
        user: user._id,
        review: review,
        createdAt: new Date(),
    });

    await newReview.save();
    // console.log("newReview",newReview)

    
    await User.findByIdAndUpdate(
        user._id,
        { 
            $push: { ratings: newRating._id, reviews: newReview._id } 
        },
        { new: true, upsert: true }
    );
     // console.log("await User.findByIdAndUpdate",newRating)

     await Product.findByIdAndUpdate(
        productId,
        { 
            $push: { ratings: newRating._id, reviews: newReview._id }  
        },
        { new: true, upsert: true }
    );


    return { rating: newRating, review: newReview };
}

async function getAllRatingReviewsByUsers(productId, userId) 
{
    try 
    {
        const ratings = await Rating.find({ product: productId, user: userId });

        const reviews = await Review.find({ product: productId, user: userId });

        return { ratings, reviews }; 
    } catch (error) {
        throw new Error("Error fetching ratings and reviews: " + error.message);
    }
}


async function getProductsAllRatingReview(productId)
{
    const product= await productService.getAllReviews(reqData.productId);
    return await Rating.find({product:productId});
}

async function createReview(reqData,user) 
{
    const product = await productService.findProductById(reqData.productId)

    const review = new Review({
        user:user._id,
        product:product._id,
        review:reqData.review,
        createdAt:new Date()
    })
    await product.save();
    return await review.save();
}

async function getAllReviews(productId)
{
    const product= await productService.getAllReviews(reqData.productId);

    return await Review.find({product:productId}).populate("user");
}

module.exports={
    createRatingReviews,
    getAllRatingReviewsByUsers,
    createReview,
    getAllReviews
}