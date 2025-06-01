import { Box, Modal } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom';
import RatingReviewForm from './RatingReviewForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    outline:"none",
    boxShadow: 24,
    pt: 4,
    px: 4,
    pb: 4,
    borderRadius:5
  };

const RatingReviewModal = ({ handleClose, open ,productId}) => {
  const location=useLocation();
  return (
    <div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description" 
            >
        <Box sx={{ ...style, width: 600 }}>
          {location.pathname ==='/account/order'?<RatingReviewForm productId={productId}/>:<RatingReviewForm  productId={productId}/>}
        </Box>
    </Modal>
    </div>
  )
}

export default RatingReviewModal