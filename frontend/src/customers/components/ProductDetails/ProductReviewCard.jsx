import { Avatar, Box, Grid, Rating } from '@mui/material';
import React from 'react';

const ProductReviewCard = ({ rating, review }) => {
  return (
    <div>
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar className="text-white" sx={{ width: 56, height: 56, bgcolor: "#9155fd" }}>
              {rating?.user?.firstName?.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">{rating?.user?.firstName || 'Anonymous'}</p>
              <p className="opacity-70">{new Date(rating?.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <Rating value={rating?.rating || 0} name="half-rating" readOnly precision={0.5} />
            </div>
            <p>{review?.review || 'No review provided.'}</p>
          </div> 
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;
