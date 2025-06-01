
const mongoose=require("mongoose");


const orderItemSchema= new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        required:true
    },
    size:{
        type:String
    },
    quantity:{
        type:Number,
        requried:true
    },
    price:{
        type:Number,
        requried:true
    },
    discountedPrice:{
        type:Number,
        requried:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    }
})

const OrderItem=mongoose.model("orderItems",orderItemSchema);

module.exports= OrderItem;