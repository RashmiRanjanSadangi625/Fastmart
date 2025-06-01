const cartService=require("../services/cart.service");



const findUserCart=async(req,res)=>
    {
        const user=req.user;
        try {

            const cart= await cartService.findUserCart(user._id)
            res.status(200).send(cart)
            
        } catch (error) { res.status(500).send({error:error.message})
            
        }
    } 
const addItemToCart=async(req,res)=>
{
    const user=req.user;

    // console.log("controller",user)
    try {

        const cartItem= await cartService.addItemToCart(user._id,req.body)
        res.status(200).send(cartItem)
        
    } catch (error) { res.status(500).send({error:error.message})
        
    }
}     
module.exports={
    findUserCart,
    addItemToCart
}