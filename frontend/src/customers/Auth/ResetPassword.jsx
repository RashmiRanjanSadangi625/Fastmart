import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updatePassword } from '../../State/Auth/Action';

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { auth } = useSelector(store => store);

    const [status, setStatus] = useState(false); 
    const [submitted, setSubmitted] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const password = data.get("password");
        const confirmPassword = data.get("confirmPassword");

        if (password !== confirmPassword) {
            setStatus(true);
            return;
        }

        const email = location.pathname.split('/')[2];
        const token = location.pathname.split('/')[3];
        const userData = { email, password, token };

        console.log(token);

        dispatch(updatePassword(userData));
        setStatus(false);  
        setSubmitted(true);
    }

    useEffect(() => {
        if (auth?.ack?.message === "ok" && submitted) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 3000);

            return () => clearTimeout(timer); 
        }
    }, [auth, submitted, navigate]);

    return (
        <div className='flex items-center justify-center flex-col w-[50%] m-auto'>
           
            {(status || (auth?.ack?.message && submitted)) && (
                <div className='flex mt-4'>
                    {status ? (
                        <p className='text-md font-bold py-4 p-2 rounded mb-2 text-red-600 bg-red-200'>
                            Password Mismatch
                        </p>
                    ) : auth?.ack?.message === "ok" ? (
                        <p className='text-md font-bold py-4 p-2 rounded mb-2 text-green-600 bg-green-200'>
                            Password Reset Successfully!
                            <span> Redirecting to main page...</span>
                        </p>
                    ) : (
                        <p className='text-md font-bold py-4 p-2 rounded mb-2 text-red-600 bg-red-200'>
                            Failed to reset password. Please try again.
                        </p>
                    )}
                </div>
            )}

            {/* Heading */}
            <div className='flex mt-4'>
                <p className='text-2xl font-bold py-4 mb-2'>Reset Password</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField 
                            required 
                            id="password"
                            name='password'
                            label="Password"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            required 
                            id="confirmPassword"
                            name='confirmPassword'
                            label="Confirm Password"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            className='text-white w-full' 
                            type='submit' 
                            variant='contained' 
                            size='large' 
                            sx={{ padding: '.8rem 0', bgcolor: "#9155FD", color: "white" }}
                        >
                            Update Password
                        </Button>
                    </Grid>
                </Grid>
            </form>

            {/* Footer Links */}
            <div className='flex justify-center flex-col items-center'>
                <div className='py-3 flex items-center'>
                    <Button onClick={() => navigate('/login')} className="ml-5" size='small'>
                        LOGIN
                    </Button>
                    <p>if you don't have account!</p> 
                    <Button onClick={() => navigate('/register')} className="ml-5" size='small'>
                        REGISTER
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;
