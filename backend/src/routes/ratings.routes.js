const express = require("express"); 
const router = express.Router();

const ratingReviewsController= require("../controller/ratings.controller");
const authenticate = require("../middleware/authenticate");

router.post("/create",authenticate,ratingReviewsController.createRatings);
// router.put("/product/:productId",authenticate,ratingReviewsController.getAllRating);

router.get("/data",authenticate,ratingReviewsController.getAllRatingReviewsByUsers);
router.get("/:productId",authenticate,ratingReviewsController.getProductRatingReviews);


module.exports=router;