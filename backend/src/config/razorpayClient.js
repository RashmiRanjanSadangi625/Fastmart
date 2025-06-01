const Razorpay = require('razorpay');


const apiKey='rzp_test_TiknYOFoVuH34f';
const apiSecret='lgZgCWcH9rUssI215rVAM6tY';

const razorpay = new Razorpay({
  key_id:apiKey ,
  key_secret:apiSecret ,
});

module.exports = razorpay;