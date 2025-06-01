const ratingsService=require("../services/ratings.service")
 

const createRatings=async(req,res)=>
{
    // console.log(req);
    const user=req.user;
    try {
        const rating=await ratingsService.createRatingReviews(req.body,user);
            return res.status(201).send(rating)
        
    } catch (error) {return res.status(500).send({error:error.message})
        
    }
}

const getAllRatingReviewsByUsers = async (req, res) => {
    const { productId, userId } = req.query;

    // console.log("Product ID:", productId);
    // console.log("User ID:", userId);

    try {
        if (!productId || !userId) {
            return res.status(400).send({ error: "Missing productId or userId" });
        }

        const ratings = await ratingsService.getAllRatingReviewsByUsers(productId, userId);
        return res.status(200).send(ratings);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const getProductRatingReviews=async(req,res)=>
{
    // console.log(req);
    const user=req.user;
    try {
        const rating=await ratingsService.getProductRatingReviews(req.body,user);
            return res.status(201).send(rating)
        
    } catch (error) {return res.status(500).send({error:error.message})
        
    }
}



// const getAllRatingReviewsByUsers=async(req,res)=>
// {
//     const productId=req.params.productId;
//     console.log("req.params.productId",req)
//     try {
//         const ratings=await ratingReviewsService.getAllRatingReviewsByUsers(req.params.productId,req.params.user._id);
//             return res.status(201).send(ratings)
        
//     } catch (error) {return res.status(500).send({error:error.message})
        
//     }

// }


const getAllRatings=async(req,res)=>
{
    const productId=req.params.productId;
    try {
        const ratings=await ratingReviewsService.getAllRatings(productId);
            return res.status(201).send(ratings)
        
    } catch (error) {return res.status(500).send({error:error.message})
        
    }

}

module.exports={
createRatings,
getAllRatings,
getAllRatingReviewsByUsers,
getProductRatingReviews
}