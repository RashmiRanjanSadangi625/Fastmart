const orderService=require("../services/order.service");

const createOrder=async(req,res)=> 
{
    // console.log("req. from controller",req);
    const user= await req.user;
    try {
        let createdOrder = await orderService.createOrder(user,req.body); 

        return res.status(201).send(createdOrder)
        
    } catch (error) {return res.status(500).send({error:error.message})   
    }

}
const findOrderById=async(req,res)=>
{
    const user=await req.user
    try {
        let createdOrder = await orderService.findOrderById(req.params.id);

        return res.status(201).send(createdOrder)
        
    } catch (error) {return res.status(500).send({error:error.message})   
    }

}

// ------------------------------------------------------------------


const orderHistory=async(req,res)=>
{
    const user=await req.user
    // console.log(user);
    try {
        let orderHistory = await orderService.usersOrderHistory(user._id);

        return res.status(201).send(orderHistory)
        
    } catch (error) {return res.status(500).send({error:error.message})   
    }

}
// -------------------------------------------------

const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders(); 
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Order status related functions
const confirmOrder = async (req, res) => {
  const { orderId } = req.params;
  // console.log("orderId",orderId)

  try {
    // Find and update the order's status
    const updatedOrder = await orderService.confirmedOrder(orderId);

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const shipOrder = async (req, res) => {
  const { orderId } = req.params;
  // console.log("orderId", orderId);

  try {
    const updatedOrder = await orderService.shipOrder(orderId);

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deliverOrder = async (req, res) => {
  const { orderId } = req.params;
  // console.log("orderId", orderId);

  try {
    const updatedOrder = await orderService.deliveredOrder(orderId);

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  // console.log("orderId", orderId);

  try {
    const updatedOrder = await orderService.cancelledOrder(orderId);

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  // console.log("orderId", orderId);

  try {
    const deletedOrder = await orderService.deleteOrder(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getOrdersOnStatus = async (req, res) => {
  try {
    const userId = req.user._id; 
    const orderStatus = req.params.orderStatus.toUpperCase(); 

    // Validate orderStatus
    const validStatuses = ["ALL","CONFIRMED","PENDING","SHIPPED", "DELIVERED", "CANCELLED", "RETURN"];
    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({ error: "Invalid order status" });
    }

    const orders = await orderService.getOrdersOnStatus(userId, orderStatus);

    if (!orders.length) {
      return res.status(404).json({ error: "No orders found for this status" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports= {
getOrders,
createOrder,
findOrderById,
orderHistory,
confirmOrder,
shipOrder,
deliverOrder,
cancelOrder,
deleteOrder,
getOrdersOnStatus
}