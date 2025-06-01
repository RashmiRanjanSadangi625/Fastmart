import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { updatePayment } from "../../../State/Payment/Action";
import { getOrderById } from "../../../State/Order/Action";
import { Alert, AlertTitle, Grid } from "@mui/material";
import OrderTracker from "../Order/OrderTracker";
import AddressCard from "../AddressCard/AddressCard";

const PaymentSuccess = () => {
    const { id: orderId } = useParams(); // Get order ID from URL
    console.log("Extracted params:", orderId);
    const [searchParams] = useSearchParams(); // Extract query params
    const dispatch = useDispatch();
    const { orders } = useSelector(store => store);

    const [paymentId, setPaymentId] = useState();
    const [paymentStatus, setPaymentStatus] = useState();

    useEffect(() => {
        setPaymentId(searchParams.get("razorpay_payment_id"));
        setPaymentStatus(searchParams.get("razorpay_payment_link_status"));
    }, [searchParams]);

    useEffect(() => {
        // console.log("Extracted sId:", orderId);
        if (paymentId) {
            const data = { orderId, paymentId };
            dispatch(getOrderById(orderId)); 
            dispatch(updatePayment(data));
        }
    }, [orderId, paymentId, dispatch]);

    // console.log("order",orders?.order?.orderItems);
    

    return (
        <div className="px-2 lg:px-36">
            <div className="flex flex-col justify-center items-center">
                <Alert
                    variant="filled"
                    severity="success"
                    sx={{ mb: 6, width: "fit-content" }}
                >
                    <AlertTitle>Payment Success</AlertTitle>
                    🎉 Congratulations! Your order has been placed successfully.
                </Alert>

                <OrderTracker activeStep={1} />

                <Grid container className="space-y-5 py-5 pt-20">
                    {orders?.order?.orderItems?.map((item, index) => (
                        <Grid
                            key={index}
                            container
                            item
                            className="space-y-3 shadow-gray-700 border-1 border-gray-200 p-5"
                            sx={{ alignItems: "center", justifyContent: "space-between" }}
                        >
                            <Grid item xs={6}>
                                <div className="flex items-center">
                                    <img
                                        src={item.product?.imageUrl   || "placeholder.jpg"}
                                        alt={item.product?.imageUrl || "Product Image"}
                                        className="w-[5rem] h-[5rem] object-cover object-top"
                                    />
                                    <div className="ml-5 space-y-2">
                                        <p>{item.product?.title || "Product Title"}</p>
                                        <div className="opacity-50 text-xs font-semibold space-y-3">
                                            <span>Size: {item.size || "N/A"}</span>
                                        </div>
                                        <p>Seller: {item.product?.brand || "Unknown Seller"}</p>
                                        <p>Price: ₹{item.price || "N/A"}</p>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item>
                                <AddressCard address={orders?.order?.shippingAddress} />
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default PaymentSuccess;
