import { Box, Button, Grid, TextField } from '@mui/material'
import React from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../../../State/Order/Action'
import { useNavigate } from 'react-router-dom'

const DeliveryAddressForm = () => { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector(store => store);

    // Handle saved address selection
    const handleDeliverHere = (selectedAddress) => {
    
        const address = {
            id:selectedAddress._id,
            firstName: selectedAddress.firstName,
            lastName:selectedAddress.lastName,
            streetAddress: selectedAddress.streetAddress,
            city: selectedAddress.city,
            state: selectedAddress.state,
            zipcode: selectedAddress.zipcode,   
            mobile: selectedAddress.mobile,
        };
        // console.log("addressData", address);

            const orderData={address,navigate}

            console.log("addressData", orderData);

            dispatch(createOrder(orderData))
    };
    

    // Handle manual form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
    
        const address = {
            firstName: data.get("firstName") || "",   // Ensure values are retrieved
            lastName: data.get("lastName") || "",
            streetAddress: data.get("address") || "",  // This must match `name="address"`
            city: data.get("city") || "",
            state: data.get("state") || "",
            zipcode: data.get("zip") || "",
            mobile: data.get("phoneNumber") || "",
        };
    
        console.log("addressData", address);
    
        // Ensure all required fields have values
        if (!address.firstName || !address.lastName || !address.streetAddress || 
            !address.city || !address.state || !address.zipcode || !address.mobile) {
            console.error("❌ Error: Some fields are missing.");
            return;
        }
    
        const orderData = { address, navigate };
    
        dispatch(createOrder(orderData));
    };
    
    console.log("auth",auth?.user?.address);
    

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12} lg={5} className="border rounded-md shadow-md h-[30.5rem] overflow-y-scroll">
                    <div className="p-5">
                        <h2 className="text-lg font-semibold mb-3">Saved Addresses</h2>
                        {auth?.user?.address.map((item, index) => (
                            <div key={index} className="border-b-1 rounded-md p-3 mb-3">
                                 <div>
                                    <div className='space-y-3'>
                                        <p className='font-semibold'>{item?.firstName + item?.lastName}</p>
                                        <p>{item?.streetAddress},{item?.state},{item?.zipcode}</p>
                                        <div className='space-y-1'>
                                            <p className='font-semibold'>Phone Number</p>
                                            <p>{item?.mobile}</p>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    sx={{ mt: 1, bgcolor: "RGB(145,85,253)" }}
                                    size="small"
                                    variant="contained"
                                    onClick={() => handleDeliverHere(item)}
                                >
                                    Deliver Here
                                </Button>
                            </div>
                        ))}
                    </div>
                </Grid>

                {/* Right Side: Manual Address Form */}
                <Grid item xs={12} lg={7}>
                <Box className="border rounded-md shadow-md p-5">
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="Firstname"
                                fullWidth
                                autoComplete='given-name'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Lastname"
                                fullWidth
                                autoComplete='given-name'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                id="address"
                                name="address"
                                label="Address"
                                fullWidth
                                autoComplete='given-name'
                                multiline
                                rows={4}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                required
                                id="city"
                                name="city"
                                label="City"
                                fullWidth
                                autoComplete='given-name'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                required
                                id="state"
                                name="state"
                                label="State/Province/Region"
                                fullWidth
                                autoComplete='given-name'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                required
                                id="zip"
                                name="zip"
                                label="Zip/Postal Code"
                                fullWidth
                                autoComplete='shipping postal-code'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                required
                                id="phoneNumber"
                                name="phoneNumber"
                                label="Contact No."
                                fullWidth
                                autoComplete='given-name'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <Button sx={{py:1.5,mt:2,bgcolor:"RGB(145,85,253)"}} size='large' variant='contained' type='submit'>Deliver Here</Button>
                            </Grid>

                        </Grid>

                    </form>

                </Box>
                </Grid>
            </Grid>
        </div>
    );
};


export default DeliveryAddressForm