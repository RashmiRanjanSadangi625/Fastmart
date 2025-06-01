const mongoose=require("mongoose")


const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        requried:true,
    },
    lastName:{
        type:String,
        requried:true,
    },
    password:{
        type:String,
        requried:true,
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        requried:true,
        default:"CUSTOMER"
    },
    mobile:{
        type:String,
    },
    address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"addresses"
    }],
    paymentInfo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"payment_information"
    }],
    ratings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ratings"
    }],
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"reviews"
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    }
    }
)
const User=mongoose.model("users",userSchema);
module.exports= User