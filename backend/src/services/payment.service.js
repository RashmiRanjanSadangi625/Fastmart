const axios  = require("axios");
const razorpay=require("../config/razorpayClient")
const orderService = require("./order.service")
const Order = require("../models/order.model");
const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const PaymentInformation = require("../models/payment_information.model");

const createPaymentLink = async (orderId) => {
  const key_id = "rzp_test_mLmCk76UiPlo9e";
  const key_secret = "hQSVgTdcEKbNskqtJWimlKop";

  try {
    const order = await Order.findById(orderId).populate("user");
    // console.log("Order:",order)

    const paymentLinkRequest = {
      amount: Number(order.totalDiscountedPrice) * 100,
      currency: "INR",
      customer: {
        name: `${order?.user?.firstName || "Guest"} ${order?.user?.lastName || ""}`,
        contact: order?.user?.mobile || "9887458741",
        email: order?.user?.email || "guest@example.com"
      },
      notify: { sms: true, email: true },
      reminder_enable: true,
      callback_url: `http://localhost:5173/payments/${orderId}`,
      callback_method: "get"
    };
    // console.log("paymentLinkRequest:",paymentLinkRequest)

    const response = await axios.post(
      "https://api.razorpay.com/v1/payment_links/",
      paymentLinkRequest,
      {
        auth: { username: key_id, password: key_secret },
        headers: { "Content-Type": "application/json" }
      }
    );

    // console.log("response:",response)

    const paymentLinkId = response.data.id;
    const payment_link_url = response.data.short_url;

    // console.log("paymentLinkId  :",paymentLinkId)

    // Create Payment Information Entry
    const paymentInfo = new PaymentInformation({
      user: order.user._id,
      order: order._id,
      paymentMethod: "Razorpay",
      paymentId: paymentLinkId,
      paymentStatus: "Pending",
      amount: order.totalPrice,
    });
    // console.log("Payment data:",paymentInfo)

    await paymentInfo.save();

    // console.log("Payment data:",paymentInfo)
    

    // Update Order with Payment Details
    order.paymentDetails = {
      paymentMethod: "Razorpay",
      paymentId: paymentLinkId,
      paymentStatus: "Pending"
    };
    await order.save();

    // console.log("Order data:",order)

    // Clear cart items
 // Find the user's cart
    const userCart = await Cart.findOne({ user: order.user._id });
    if (!userCart) throw new Error("Cart not found");

    // Remove all cart items linked to this cart
    await CartItem.deleteMany({ cart: userCart._id });

    // Update User with Payment Info
    await User.findByIdAndUpdate(order.user._id, {
      $push: { paymentInfo: paymentInfo._id }
    });

    const resData = {
            paymentLinkId,
            payment_link_url
        };

    // console.log("Payment data:",response)

    return resData;
  } catch (error) {
    throw new Error(error.message);
  }
};


const updatePaymentInformation=async(reqData)=>
{
    const paymentId=reqData.paymentId;
    const orderId=reqData.orderId;

    try 
    {
        const order =orderService.findOrderById(orderId);
 
        const payment =await razorpay.payment.fetch(paymentId)

        if(payment.status =="captured")
        {
            order.paymentDetails.paymentId=paymentId;
            order.paymentDetails.status="COMPLETED";
            order.orderStatus="PLACED"

            await order.save();
        }
        const resData={message:"Your order is placed",success:true}

        return resData;
        
    } catch (error) {
        throw new Error(error.message)}

}

module.exports={
    createPaymentLink,
    updatePaymentInformation
}