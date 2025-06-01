import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotUserPassword, login } from '../../State/Auth/Action';


const ForgotPassword = ({handleClose}) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const { auth } = useSelector(store => store);

    const[status,setStatus] = useState(false);
     

    const handleSubmit=(e)=>{
    e.preventDefault();

    const data= new FormData(e.currentTarget)

    const userData={
      email:data.get("email")
    }
    dispatch(forgotUserPassword(userData));
    if(auth?.mailSentAck?.status === 200)
    {
      setStatus(true);  
    }
    // console.log(userData) ;

  }

  console.log(auth)

  return (
    <div>
        <div className='flex  justify-center flex-col md:'>
        <div className='flex'>
          <p className='text-2xl font-bold py-4 mb-2'>Login</p>
        </div>
        { status && <p className='text-md m-auto text-green-800 bg-green-300 p-2'>Reset email sent ! </p>}
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
          
          </Grid>
          <Grid item xs={12}>
            <TextField 
            required 
            id="email"
            name='email'
            label="Email"
            fullWidth
            autoComplete='email'
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button className='text-white w-full' 
            type='submit' 
            variant='content' 
            size='large' 
            sx={{padding:'.8rem 0',bgcolor:"#9155FD",color:"white"}}
            >Send Reset Email</Button>
          </Grid>
          

        </Grid>
      </form>
      <div className='flex  justify-center flex-col items-center'>
        <div className='py-3 flex items-center'>
          <Button onClick={()=>navigate('/login')} className="ml-5" size='small'>
           LOGIN
          </Button>
          <p>if you don't have account !</p> 
          <Button onClick={()=>navigate('/register')} className="ml-5" size='small'>REGISTER</Button>
         
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;
