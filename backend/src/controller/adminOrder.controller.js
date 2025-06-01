const orderService=require("../services/order.service")

const getAllOrders=async(req,res)=>
{
    try {

        const orders=await orderService.getAllOrders();

        return res.status(200).send(orders)
    } catch (error) { return res.status(500).send({error:error.message})
        
    }
}

const confirmedOrder=async(req,res)=>
{
        const orderId=req.params.orderId;
        try {
    
            const orders=await orderService.confirmedOrder(orderId);
    
            return res.status(200).send(orders)
        } catch (error) { return res.status(500).send({error:error.message})
            
        }
}
const shipOrders=async(req,res)=>
    {
            const orderId=req.params.orderId;
            try {
        
                const orders=await orderService.shipOrders(orderId);
        
                return res.status(200).send(orders)
            } catch (error) { return res.status(500).send({error:error.message})
                
            }
    }
    
const deliverOrders=async(req,res)=>
    {
            const orderId=req.params.orderId;
            try {
        
                const orders=await orderService.deliverOrders(orderId);
        
                return res.status(200).send(orders)
            } catch (error) { return res.status(500).send({error:error.message})
                
            }
    }
const cancelledOrders=async(req,res)=>
{
        const orderId=req.params.orderId;
        try {
    
            const orders=await orderService.cancelledOrders(orderId);
    
            return res.status(200).send(orders)
        } catch (error) { return res.status(500).send({error:error.message})
            
        }
}
const deleteOrders=async(req,res)=>
    {
            const orderId=req.params.orderId;
            try {
        
                const orders=await orderService.deleteOrders(orderId);
        
                return res.status(200).send(orders)
            } catch (error) { return res.status(500).send({error:error.message})
                
            }
    } 
    
    module.exports={
        getAllOrders,
        confirmedOrder,
        shipOrders,
        deliverOrders,
        cancelledOrders,
        deleteOrders
    }
    
    