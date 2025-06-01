import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import FilterListIcon from '@mui/icons-material/FilterList';
import { getAllUserOrders, getOrdersStatusData } from '../../../State/Order/Action'


const orderStatusOptions = [
    { label: "All Orders", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Return", value: "return" }
  ];
  
  const Order = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((store) => store);
  
    useEffect(() => {
      dispatch(getAllUserOrders()); // Fetch all orders
    }, [dispatch]);
  
    const handleFilter = (status) => {
      dispatch(getOrdersStatusData(status)); // Fetch orders by status
      // console.log("Fetching orders for status:", orders);
    };
  
    return (
      <div className="px-5 lg:px-20 m-5">
        <Grid container sx={{ justifyContent: "space-between" }}>
          <Grid item xs={2.5}>
            <div className="h-auto shadow-lg bg-white p-5 sticky top-5">
              <h1 className="font-bold text-lg">Filters <FilterListIcon clas/></h1>
              
              {orderStatusOptions?.map((option) => (
                <div key={option.value} className="space-y-4 mt-5">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="orderStatus"
                      value={option.value}
                      onChange={() => handleFilter(option.value)}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <label className="ml-3 text-sm text-gray-600" htmlFor={option.value}>
                      {option.label}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={9}>
            <div className="space-y-2">
              {orders?.orders?.length > 0 ? (
                orders?.orders?.map((item) => <OrderCard key={item._id} orders={item} />)
              ) : (
                <p>No orders found for the selected status.</p>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  };
  

export default Order



// const dispatch = useDispatch();
// const ordersState = useSelector(state => state.order);
// const orders = ordersState?.orders || []; 

// useEffect(() => {
//     dispatch(getAllUserOrders()); 
// }, [dispatch]);

// console.log("User Orders:",  orders?.orderItems);