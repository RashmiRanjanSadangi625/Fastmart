const mongoose=require("mongoose");

const addressSchema= new mongoose.Schema({
    addressId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"adddress"
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    streetAddress:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true,
    },
    zipCode:{
        type:Number,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"users"
    },
    mobile:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
    })

    const Address = mongoose.model("addresses",addressSchema);

    module.exports = Address
