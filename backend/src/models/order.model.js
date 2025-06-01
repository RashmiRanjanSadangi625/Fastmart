const mongoose=require("mongoose");


const orderSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'orderItems',
    }],
    orderDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    deliveryDate:{
        type:Date    
    },
    shippingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'addresses',
    },
    paymentDetails: {
      paymentMethod: {
        type: String
      },
      paymentId: {
        type: String
      },
      paymentStatus: {
        type: String,
        enum: ["Pending", "Success", "Failed"]
      }
    },
    totalPrice:{
        type:Number,
        requried:true
    },
    totalDiscountedPrice:{
        type:Number,
        requried:true
    },
    discounts:{
        type:Number,
        requried:true
    },
    orderStatus:{
        type:String,
        requried:true,
        default:"PENDING"
    },
    totalItem:{
        type:Number,
        required :true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Order=mongoose.model("orders",orderSchema);

module.exports= Order;