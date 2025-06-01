import { Grid } from '@mui/material'
import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const OrderCard = ({orders}) => {
    const navigate= useNavigate()
    
    // console.log("orders card",orders)  
  return (
    <>
   {orders?.orderItems.map((item)=> <div onClick={()=>navigate(`/account/order/${orders._id}/${item?.product?._id}`)} className='p-5 rounded shadow-md hover:shadow-2xl border border-gray-200'>

        <Grid container spacing={2} sx={{justifyContent:"space-between"}}>
            <Grid item xs={5}>
                <div className='flex cursor-pointer '>
                    <img className=' w-[5rem] h-[5rem] object-cover object-top'src={item?.product?.imageUrl}/>
                    <div className='ml-5 space-y-2'>
                        <p className=''>{item?.product?.brand}</p>
                        <p className='opacity-50 text-xs font-semibold'>Size:{item?.size}</p>
                        <p className='opacity-50 text-xs font-semibold'>Color:{item?.product?.color}</p>

                    </div>
                </div>
            </Grid>
            <Grid item xs={3}>
                <p>${item?.product?.discountedPrice}</p>
                <p className='text-blue-800'>Original Price ${item?.product?.price}</p>
            </Grid>
            <Grid item xs={4}>
                { true && 
                <div>
                    <p>
                    <AdjustIcon sx={{width:"15px",height:"15px"}} className="text-green-600 mr-2 text-sm"/>
                    <span>{orders?.orderStatus} on March 03</span>
                </p>
                <p className='text-xs'>Your item has been {orders?.orderStatus}

                </p>
                </div>}
                {false && <p> 
                    <span>Your item has been {orders?.orderStatus}</span> 
                </p>}
            </Grid>
        </Grid>
    </div>)}
    </>
  )
}

export default OrderCard