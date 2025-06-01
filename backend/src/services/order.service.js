const Address  = require("../models/address.model");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderItems.model");
const cartService = require("../services/cart.service");

async function createOrder(user, shipAddress) {
  let address;
  // console.log("shipAddress service",shipAddress);
  // console.log("req. from service",user);

  if (shipAddress.id) {
    let existAddress = await Address.findById(shipAddress.id);
    if (!existAddress) {
      throw new Error("Address not found in database");
    }
    address = existAddress;
  } 
  else 
  {
    address = new Address(shipAddress);
    address.user = user._id;
    await address.save();
    user.address.push(address);
    await user.save();

    // console.log("address. from service else part------------------- ",address);

  }
  // console.log("Address",address);

  const cart = await cartService.findUserCart(user._id); 

  // console.log("cart",cart);
  const orderItems = [];

  for (const item of cart.cartItems) 
  {
    const orderItem = new OrderItem(
    {
      price: item.price,
      product: item.product[0]._id,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });
    const createdOrderItem = await orderItem.save();

    orderItems.push(createdOrderItem);
  }

  // console.log("orderItems",orderItems);
  const createdOrder = new Order({
    user,
    orderItems, 
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discountedPrice: cart.discounts,
    totalItem: cart.totalItem,
    shippingAddress: address,
  });

  const savedOrder = await createdOrder.save();

  // console.log("savedOrder",savedOrder);

  return savedOrder;
}

async function placeOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "PLACED";
  order.paymentDeials.status = "COMPLETED";

  return await order.save();
}

async function confirmedOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "CONFIRMED";

  return await order.save();
}
async function shipOrder(orderId) {
  const order = await findOrderById(orderId);

  // console.log("shipOrder",order)

  order.orderStatus = "SHIPPED";

  return await order.save();
}
async function deliveredOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "DELIVERED";

  return await order.save();
}
async function cancelledOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "CANCELLED";

  return await order.save();
}

async function findOrderById(orderId) {

  // console.log("order service",orderId);
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");

    // console.log("order details",order);

  return order;
}

async function usersOrderHistory(userId) {
  // console.log(userId._id) 
  try {
    const orders = await Order.find({ user: userId})
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();

      // console.log(orders)

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllOrders() {
  return await Order.find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("user")
    .lean();
}
async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  await Order.findByIdAndDelete(orderId);

  return { message: "Order deleted successfully" };
}


async function getOrdersOnStatus(userId, orderStatus) {
  // console.log('orderstatus',orderStatus)
  let orders
  try {

    if(orderStatus == 'all' || orderStatus == 'ALL' )
    {
      orders = await Order.find({ user: userId}).populate({ path: "orderItems", populate: { path: "product" } })
    }    
    else
    {
      orders = await Order.find({ user: userId, orderStatus }).populate({ path: "orderItems", populate: { path: "product" } })
    }
    
    if (!orders || orders.length === 0) {
      throw new Error("No orders found for the given status.");
    }

    return orders;
  } catch (error) {
    // console.error("Error fetching orders:", error.message); 
    throw error;
  }
}



module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipOrder,
  deliveredOrder,
  cancelledOrder,
  findOrderById,
  usersOrderHistory,
  getAllOrders,
  deleteOrder,
  getOrdersOnStatus
  
};
