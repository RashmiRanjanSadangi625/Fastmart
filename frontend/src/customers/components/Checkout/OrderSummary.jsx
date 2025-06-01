import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { Button } from '@mui/material'
import CartItem from '../Cart/CartItem'
import { getOrderById } from '../../../State/Order/Action'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createPayment } from '../../../State/Payment/Action'


const OrderSummary = () => {
    const dispatch = useDispatch();
    const {orders} =useSelector(store=>store)

    const location=useLocation();
    const searchParams= new URLSearchParams(location.search)
    const orderId= searchParams.get("order_id")

    useEffect(()=>
    {
        dispatch(getOrderById(orderId))
    },[orderId])

    const handleCheckout=()=>
    {
        dispatch(createPayment(orderId))
    }

    console.log("orders",orders)
    
  return (
    <div>
        <div className='p-5 shadow-lg rounded-s-md md-border'>
            <AddressCard address={orders?.order?.shippingAddress}/> 
        </div>
        <div>
        <div className='lg:grid grid-cols-3 relative'>
            <div className='col-span-2'> 
               {orders?.order?.orderItems.map((item)=> <CartItem item={item}/>)} 
            </div>
            <div className='px-5 sticky top-0 h-[100vh] m-5 lg:mt-0'>
                <div className='border border-gray-200 m-3 p-5'>
                    <p className='uppercase font-bold opacity-6- pb-4 '>Price Details</p>
                    <hr/>   
                    <div className='space-y-3 font-semibold m-5'>
                        <div className='flex justify-between pt-3 text-black'>
                            <span>Price</span>
                            <span>₹{orders?.order?.totalPrice}</span>
                        </div>
                        <div className='flex justify-between pt-3'>
                            <span>Discounts Applied</span>
                            <span className='text-green-600'>- ₹{orders?.order?.totalPrice - orders?.order?. totalDiscountedPrice}</span>
                        </div>
                        <div className='flex justify-between pt-3'> 
                            <span>Delivery Charge</span>
                            <span className='text-green-600'>Free</span>
                        </div>
                        <div className='flex justify-between pt-3'>
                            <span>Discount Off</span>
                            <span className='text-green-600'>{Math.floor((orders?.order?.totalDiscountedPrice/orders?.order?.totalPrice) * 100)} %</span>
                        </div>
                        <div className='flex justify-between pt-3 '>
                            <span>Total Amount</span>
                            <span className='text-green-600 font-bold'>₹{orders?.order?.totalDiscountedPrice}</span>
                        </div>
                    </div>
                    <Button 
                    onClick={handleCheckout}
                    variant="contained" 
                    className='w-full mt-5' 
                    sx={{px:"2.5rem",py:"0.7rem",bgcolor:"#9155fd"}}> 
                    Checkout
                    </Button>
                    
                </div>
            </div>
        </div>        
    </div>
        
    </div>
  )
}

export default OrderSummary