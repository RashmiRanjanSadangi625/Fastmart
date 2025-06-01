import { Box, Modal } from '@mui/material'
import React from 'react'
import RegisterForm from './RegisterForm';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import ForgotPassword from './ForgotPassword';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  outline: 'none',
  boxShadow: 24,
  pt: 4,
  px: 4,
  pb: 4,
  borderRadius: 5,
  width: {
    xs: '90%',   
    sm: 500,    
    md: 600,  
  },
  maxHeight: '90vh',
  overflowY: 'auto',
};

const AuthModal = ({ handleClose, open }) => {
  const location = useLocation();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
    >
      <Box sx={style}>
        {location.pathname === '/login' ? 
        <LoginForm /> 
        : location.pathname === '/forgotPassword' ? <ForgotPassword handleClose={handleClose}/> 
        : <RegisterForm />}
      </Box>
    </Modal>
  );
};

export default AuthModal;
