import { Box, Button, Grid, Rating, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { createRatingReview } from '../../../State/RatingReview/Action';



const RatingReviewForm = (productId) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);
    const {ratingReview }= useSelector(store=>store) 
    
    const location=useLocation();;
    const searchParams= new URLSearchParams(location.search);
    // const productId= searchParams.get("product._id");
    

    const handleSubmit=(e)=>
      {
          e.preventDefault();

          const data= new FormData(e.currentTarget) 

          const userData={
            rating:data.get("rating"),
            review:data.get("review"),
            productId:productId?.productId
        }
        dispatch(createRatingReview(userData));
        console.log("ratingReview",ratingReview) ;
        navigate(`/account/order/`)
      }

      const labels = { 
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
      };
      function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
      }

  return (
<div>
<div className='flex  justify-center flex-col '>
  <div className='flex'>
    <p className='text-2xl font-bold py-4 mb-2'>Rate & Review Product</p>
  </div>
</div>
<form onSubmit={handleSubmit}>
  <Grid container spacing={3}>
    <Grid item xs={12} className='flex items-center justify-center'>
         <Rating
            name="rating"
            size="large"
            value={value}
            precision={1}
            required
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
            setHover(newHover);
            }}
             emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="25px" />}
          />
    </Grid>
    <Grid item xs={12}>
      <TextField 
      required 
      id="review"
      name='review'
      label="Add your honest review"
      fullWidth
      autoComplete='password'
      ></TextField>
    </Grid>
    <Grid item xs={12}>
      <Button className='text-white w-full' 
      type='submit' 
      variant='content' 
      size='large' 
      sx={{padding:'.8rem 0',bgcolor:"#9155FD",color:"white"}}
      >Submit</Button>
    </Grid>
  </Grid>
</form>

</div>
    
  )
}



// <div>
//         <div className='flex  justify-center flex-col '>
//         <div className='flex'>
//           <p className='text-2xl font-bold py-4 mb-2'>Rate and Review Product</p>
//         </div>
//       </div>
//       <form onSubmit={handleSubmit}>
     
//       <Grid container spacing={2}>
//       <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}> 
//           <Grid item xs={12} sm={6}>
            
//           </Grid>

         
//           <Grid item md={12}>
//             <TextField 
//             required 
//             id="email"
//             name='email'
//             label="Email"
//             fullWidth
//             autoComplete='email'
//             ></TextField>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField 
//             required 
//             id="password"
//             name='password'
//             label="Password"
//             fullWidth
//             autoComplete='password'
//             ></TextField>
//           </Grid>
//           <Grid item xs={12}>
//             <Button className='text-white w-full' 
//             type='submit' 
//             variant='content' 
//             size='large' 
//             sx={{padding:'.8rem 0',bgcolor:"#9155FD",color:"white"}}
//             >Register</Button>
//           </Grid>
//           </Box>
//         </Grid>
           

            
//             {/* <Button className='text-white w-full' 
//             type='submit' 
//             variant='content' 
//             size='large' 
//             sx={{padding:'.8rem 0',bgcolor:"#9155FD",color:"white"}}
//             >Login</Button> */}
            
       
//       </form>
//       <div className='flex  justify-center flex-col items-center'>
//         <div className='py-3 flex items-center'>
//           <p>if you don't have account !</p>
//           <Button onClick={()=>navigate('/register')} className="ml-5" size='small'>Register</Button>
//         </div>
//       </div>
//     </div>

export default RatingReviewForm