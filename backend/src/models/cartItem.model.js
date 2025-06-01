const mongoose=require("mongoose");


const cartItemSchema= new mongoose.Schema({
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart",
        required:true
    },
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        required:true
    }],
    size:{
        type:String,
        requried:true,
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    price:{
        type:Number,
        required:true,
    },
    discountedPrice:{
        type:Number,
        requried:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        requried:true,
    }
})

const CartItem=mongoose.model("cartItems",cartItemSchema);

module.exports= CartItem;