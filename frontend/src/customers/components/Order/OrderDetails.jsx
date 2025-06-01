import React, { useEffect, useState } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import { Box, Button, Grid, Rating } from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../State/Order/Action';
import { useParams } from 'react-router-dom';
import RatingReviewModal from '../RatingReviews/RatingReviewModal';
import { getRatingReviews } from '../../../State/RatingReview/Action';
import { findProductsById } from '../../../State/Product/Action';


const OrderDetails = () => {
    const [OpenRatingReviewModal,setOpenRatingReviewModal]=useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch=useDispatch();
    const { orders, ratingReview, auth } = useSelector(store => store);
    const { orderId, productId } = useParams();

    useEffect(() => {
        if (orderId) {
            dispatch(getOrderById(orderId));
        }

        if (auth?.user?._id && productId) {
            dispatch(getRatingReviews(auth.user._id, productId));
        }
    }, [dispatch, orderId, auth?.user?._id, productId]); 

 
    const handleOpen = () => {
        setOpenRatingReviewModal(true);
      };
    const handleClose = () => {
        setOpenRatingReviewModal(false); 
    };

    
    const invoiceDownload = async () => {
    const input = document.getElementById('invoice-content');
    if (!input) return;
  
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
  
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice_${orderId}.pdf`);
  };

    
    console.log("orderdetails",orders?.order?.orderItems); 
    console.log("ratingReview",ratingReview?.ratingReview?.ratings?.length);
    console.log("productId",productId);
    
  return (
    <div className='     lg:px-20 '>
        
    <Grid container className='space-y-5 p-5' >
        {orders?.order?.orderItems
            ?.filter((item) => item?.product?._id === productId) // Filter matching productId
            ?.map((item) => 
            <Grid  className='shadow-xl roounded-md p-5 border border-gray-200' sx={{alignItems:"center",justifyContent:"space-between"}} item container>
                <Grid item xs={9}>
                    <div className='flex items-center space-x-2'>
                        <img className =' w-[6rem] h-[6rem] object-cover object-top'src={item?.product?.imageUrl}/>
                        <div className='space-y-2 mt-2'>
                            <p className='font-semibold '>{item?.product?.title}</p>
                            <p className='space-x-5 opacity-50 text-xs font-semibold'><span>Color: {item?.product?.color}</span><span>Size: {item?.size}</span></p>
                            <p>Seller : {item?.product?.brand}</p>
                            <p>
                                <span className='font-semibold'>₹{item?.product?.discountedPrice} </span>
                                <span className=' text-gray-400 font-semibold line-through'>₹{item?.product?.price} </span>
                                <span className='text-green-500 font-semibold'>{item?.product?.discountPersent} % off</span>
                            </p>
                        </div>
                    </div>
                    <div className='py-10'>
                    <h1 className='font-bold text-xl p-3'>Order Status</h1>
                    <OrderTracker  activeStep={
                            orders?.order?.orderStatus === "CONFIRMED" ? 1 :
                            orders?.order?.orderStatus === "SHIPPED" ? 2 :
                            orders?.order?.orderStatus === "OUT_FOR_DELIVERY" ? 3 :
                            orders?.order?.orderStatus === "DELIVERED" ? 4 :
                            0 
                    } />
                        
                    </div> 
                    <div className='p-4'>
                        <h1 className='font-bold text-xl '>Address</h1>
                        <AddressCard address={orders?.order?.shippingAddress}/>
                    </div>   
                </Grid>
                <Grid item xs={3} className='flex items-center justify-center'>
                    <div className=''>
                    <Grid>
                    {orders?.order?.orderStatus === "DELIVERED" && (
                        <Box sx={{ color: "red" ,textAlign:'center'}}>
                            {ratingReview?.ratingReview?.ratings?.length > 0 ? (
                                <Rating
                                    value={ratingReview.ratingReview.ratings[0]?.rating || 0}  
                                    readOnly
                                />
                            ) : (
                                <Button onClick={() => setOpenRatingReviewModal(true)}>Rate & Review Product</Button>
                            )}
                            <RatingReviewModal
                                handleClose={handleClose}
                                open={OpenRatingReviewModal}
                                productId={item?.product?._id}
                            />
                        </Box>)}
                        {orders?.order?.orderStatus === "DELIVERED" && (
                        <Box sx={{ color: "red"}} className='mt-2 mb-2 border-1 border-gray-400'>
                            <ReceiptIcon className='cursor-pointer'/> 
                            <Button 
                            onClick={invoiceDownload}
                            sx={{ color: "black",textAlign:'center',fontWeight:'bold' }}
                            >Download Invoice </Button>
                            <FileDownloadIcon className='cursor-pointer'/>
                        </Box>)}
                    </Grid>
                    <hr/>
                    <Grid>
                    <div className='p-2'>
                            <h1 className='font-bold text-xl '>Payment Details</h1>
                            {orders?.order?.orderItems
                            ?.filter((item) => item?.product?._id === productId)
                            ?.map((item) => (
                                <div key={item._id} className='space-y-3 font-semibold mb-10'>
                                <div className='flex justify-between pt-3 text-black'>
                                    <span>Price</span>
                                    <span>₹{item?.product?.price}</span>
                                </div>
                                <div className='flex justify-between pt-3'>
                                    <span>Discounts Applied</span>
                                    <span className='text-green-600'>
                                    ₹{item?.product?.price - item?.product?.discountedPrice}
                                    </span>
                                </div>
                                <div className='flex justify-between pt-3'>
                                    <span>Delivery Charge</span>
                                    <span className='text-green-600'>Free</span>
                                </div>
                                <div className='flex justify-between pt-3'>
                                    <span>Discount Off</span>
                                    <span className='text-green-600'>
                                    {Math.floor(item?.product?.discountPersent)} %
                                    </span>
                                </div>
                                <div className='flex justify-between pt-3 '>
                                    <span>Total Amount</span>
                                    <span className='text-green-600 font-bold'>
                                    ₹{item?.product?.discountedPrice}
                                    </span>
                                </div>
                                </div>
                            ))}

                        </div>
                    </Grid>
                          
                    </div>
                     
                 </Grid>
                 
            </Grid>)}
    </Grid> 
    
    
          
    </div>
  )
}

export default OrderDetails