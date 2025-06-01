import React, { useEffect, useState } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import { Box, Button, Grid } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../State/Order/Action'; 
import { useParams } from 'react-router-dom';
import AuthModal from '../../Auth/AuthModal';
import RatingReviewModal from '../RatingReviews/RatingReviewModal';

const OrderDetails = () => {
    const [OpenRatingReviewModal,setOpenRatingReviewModal]=useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch=useDispatch();
    const {orders} = useSelector(store=>store)
    const { orderId } = useParams();

    useEffect(()=>
    {
        dispatch(getOrderById(orderId));

    },[dispatch])

    const handleOpen = () => {
        setOpenRatingReviewModal(true);
      };
    const handleClose = () => {
        setOpenRatingReviewModal(false);
    };
 
    // console.log("orderdetails",orders);  
    // console.log("orderid",orderId);
    
  return (
    <div className=' px:5 lg:px-20 '>
        <div>
            <h1 className='font-bold text-xl py-7'>Delivery Address</h1>
            <AddressCard address={orders?.order?.shippingAddress}/>
        </div>
        <div className='py-20'>
        <OrderTracker activeStep={
                orders?.order?.orderStatus === "CONFIRMED" ? 1 :
                orders?.order?.orderStatus === "SHIPPED" ? 2 :
                orders?.order?.orderStatus === "OUT_FOR_DELIVERY" ? 3 :
                orders?.order?.orderStatus === "DELIVERED" ? 4 :
                0 
        } />
        </div>
        <Grid container className='space-y-5' >
            {orders?.order?.orderItems?.map((item)=><Grid  className='shadow-xl roounded-md p-5 border border-gray-200' sx={{alignItems:"center",justifyContent:"space-between"}} item container>
                <Grid item sx={6}>
                    <div className='flex items-center space-x-2'>
                        <img className =' w-[6rem] h-[6rem] object-cover object-top'src={item?.product?.imageUrl}/>
                        <div className='space-y-2 mt-2'>
                            <p className='font-semibold '>{item?.product?.title}</p>
                            <p className='space-x-5 opacity-50 text-xs font-semibold'><span>Color: {item?.product?.color}</span><span>Size: {item?.size}</span></p>
                            <p>Seller : {item?.product?.brand}</p>
                            <p>${item?.product?.price}</p>
                        </div>
                    </div>
                </Grid>
                <Grid item>
                {orders?.order?.orderStatus === "DELIVERED" && (
                    <Box sx={{ color: "red" }}>
                        <Button
                        type="button"
                        onClick={handleOpen}
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                        <StarBorderIcon sx={{ fontSize: "2rem" }} className="px-2 text-5xl" />
                        Rate and Review Product
                        </Button>
                    </Box>
                    )}
                </Grid>
            </Grid>)}
        </Grid>
        <RatingReviewModal handleClose={handleClose} open={OpenRatingReviewModal}/>
        
    </div>
  )
}

export default OrderDetails