const express = require("express")
const cors=require("cors")
const app=express()


app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    return res.status(200).send({message:"welcome to ecommerce api node",status:true})
})
// Routes
const authRouters =require("./routes/auth.route.js")
app.use("/auth",authRouters);

const userRouters=require("./routes/user.route.js");
app.use("/api/users",userRouters);

const productRouter=require("./routes/product.routes.js");  
app.use("/api/products",productRouter);

const cartRouter=require("./routes/cart.routes.js");
app.use("/api/cart",cartRouter);

const cartItemRouter=require("./routes/cartItem.routes.js");
app.use("/api/cart_items",cartItemRouter);

const orderRouter=require("./routes/order.routes.js");
app.use("/api/orders",orderRouter);

const orderHistory=require("./routes/order.routes.js");
app.use("/api/account",orderHistory);


const reviewRouter=require("./routes/review.routes.js");
app.use("/api/reviews",reviewRouter);

const ratingRouter=require("./routes/ratings.routes.js");
app.use("/api/ratings",ratingRouter);

const paymentRouter=require("./routes/payment.routes.js");
app.use("/api/payments",paymentRouter);

//Admin Routes

const adminOrderRouter=require("./routes/order.routes.js");
app.use("/api/admin/orders",adminOrderRouter);

const adminProductRouter=require("./routes/adminProduct.routes.js");
app.use("/api/admin/products",adminProductRouter);

const adminCustomerRouter=require("./routes/adminCustomers.routes.js");
app.use("/api/admin/customers",adminCustomerRouter);



module.exports=app;