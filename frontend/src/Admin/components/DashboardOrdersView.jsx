import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import React, { useEffect } from 'react'
import { deleteProduct, findProducts } from '../../State/Product/Action';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarGroup, Button, Card, CardHeader, Menu, MenuItem } from '@mui/material';
import { confirmOrder, deleteOrder, deliveredOrder, getOrders, shipOrder } from '../../State/Admin/Order/Action';

const DashboardOrdersView = () => {

  const dispatch=useDispatch();
  const [anchorEl, setAnchorEl] = React.useState([]);
  // const open = Boolean(anchorEl);

  const handleClose = (index) => {
    const newAnchorElArray=[...anchorEl];
    newAnchorElArray[index]=null
    setAnchorEl(newAnchorElArray);
  };
  const handleClick = (event,index) => {
    const newAnchorElArray=[...anchorEl];
    newAnchorElArray[index]=event.currentTarget
    setAnchorEl(newAnchorElArray);
  };

  const {adminOrder}=useSelector(store=>store)
  useEffect(()=>{
    dispatch(getOrders())
  },[adminOrder.confirmed,adminOrder.delivered,adminOrder.shipped,adminOrder.deleteOrder])

 const handleShippedOrder=(orderId)=>{  
  dispatch(shipOrder(orderId))
  handleClose()
 }
 const handleConfirmedOrder=(orderId)=>{
  dispatch(confirmOrder(orderId))
  handleClose()
 }
  
 const handleDeliveredOrder=(orderId)=>{
  dispatch(deliveredOrder(orderId))
  handleClose()
 }

 const handleDeleteOrder=(orderId)=>{
  dispatch(deleteOrder(orderId))

 }
 console.log("Admin order",adminOrder);
 
  return (
    <div className='mt-4 p-10 shadow-lg shadow-gray-700'>
      <Card className='mt-2'>
        <CardHeader title="Recent Orders"/>

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Id&nbsp;</TableCell>
            <TableCell align="left">Price&nbsp;</TableCell>
            <TableCell align="left">Status&nbsp;</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {adminOrder?.orders.slice(0,10).map((item,index) => (
            <TableRow
              key={item?.product?.imageUrl}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left'>
                <AvatarGroup max={3} sx={{justifyContent:"start"}}>
                 {item.orderItems.map((orderItem)=> <Avatar src={orderItem?.product?.imageUrl}/>)}
                </AvatarGroup> 
              </TableCell>
              <TableCell align="left" scope='row'>
                 {item.orderItems.map((orderItem)=> <p>{orderItem?.product?.title}</p>)}
              </TableCell>
              <TableCell align="left">{item._id}</TableCell>
              <TableCell align="left">{item.totalPrice}</TableCell>
              <TableCell align="left"><span className=
              {`${item.orderStatus == "CONFIRMED"?"bg-[green]":
              item.orderStatus=="SHIPPED"?"bg-[blue]":
              item.orderStatus=="PLACED"?"bg-[gray]":
               item.orderStatus=="PENDING"?"bg-[orange]":"bg-[red]"} text-white rounded px-5 py-2`}>{item.orderStatus}</span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      </Card>
      
    </div>
  )
}

export default DashboardOrdersView
