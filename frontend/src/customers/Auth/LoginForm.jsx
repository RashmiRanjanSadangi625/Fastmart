import { Button, Grid, TextField } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../State/Auth/Action';


const LoginForm = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
     

    const handleSubmit=(e)=>{
    e.preventDefault();

    const data= new FormData(e.currentTarget)

    const userData={
      email:data.get("email"),
      password:data.get("password"),
    }
    dispatch(login(userData));
    // console.log(userData) ;

  }

  return (
    <div>
        <div className='flex  justify-center flex-col md:'>
        <div className='flex'>
          <p className='text-2xl font-bold py-4 mb-2'>Login</p>
        </div>
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
            <TextField 
            required 
            id="password"
            name='password'
            label="Password"
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
            >Login</Button>
          </Grid>
          

        </Grid>
      </form>
      <div className='flex  justify-center flex-col items-center'>
        <div className='py-3 flex items-center'>
          <Button onClick={()=>navigate('/forgotPassword')} className="ml-5" size='small'>
            Forgot Password ?
          </Button>
          <p>if you don't have account !</p> 
          <Button onClick={()=>navigate('/register')} className="ml-5" size='small'>Register</Button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm