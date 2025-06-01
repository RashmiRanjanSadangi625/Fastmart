import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, CardHeader, Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination, TextField } from '@mui/material';
import { deleteOrder, confirmOrder, deliveredOrder, getOrders, shipOrder } from '../../State/Admin/Order/Action';
import { AvatarGroup } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const OrdersTable = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalAnchorEl, setModalAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "totalPrice", direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { adminOrder } = useSelector(store => store); 

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch, adminOrder.confirmed, adminOrder.delivered, adminOrder.shipped, adminOrder.deleteOrder]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setPage(0); // Reset to the first page whenever the search query changes
  };

  const filteredOrders = adminOrder?.orders?.filter(order => {
    return (
      order?.orderItems?.some(item => item?.product?.title.toLowerCase().includes(searchQuery)) ||
      (order?.user?.firstName + ' ' + order?.user?.lastName).toLowerCase().includes(searchQuery)
    );
  });

  const sortedOrders = [...(filteredOrders || [])].sort((a, b) => {
    let valA = sortConfig.key === "orderStatus" ? a[sortConfig.key].toLowerCase() : a[sortConfig.key];
    let valB = sortConfig.key === "orderStatus" ? b[sortConfig.key].toLowerCase() : b[sortConfig.key];
    return sortConfig.direction === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
  });

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  const handleStatusUpdate = (orderId, action) => {
    switch (action) {
      case "CONFIRM":
        dispatch(confirmOrder(orderId));
        break;
      case "SHIP":
        dispatch(shipOrder(orderId));
        break;
      case "DELIVER":
        dispatch(deliveredOrder(orderId));
        break;
      default:
        return;
    }
    handleCloseModal();
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
    handleCloseModal();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  const currentOrders = sortedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  console.log(adminOrder);
  

  return (
    <div className='p-10'>
      <Card className='mt-2'>
        <CardHeader title="Recent Orders" />
        <TextField
          label="Search Orders"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">User Name</TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortConfig.key === "totalPrice"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("totalPrice")}
                  >
                    Price
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortConfig.key === "orderStatus"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("orderStatus")}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentOrders.map((item, index) => (
                <TableRow key={item._id} onClick={() => handleOrderClick(item)} sx={{ cursor: "pointer" }}>
                  <TableCell align='left'>
                    <AvatarGroup max={3} sx={{ justifyContent: "start" }}>
                      {item?.orderItems?.map((orderItem) => (
                        <Avatar src={orderItem?.product?.imageUrl} key={orderItem?.product?._id} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="left">
                    {item?.orderItems?.map((orderItem) => (
                      <p key={orderItem?.product?._id}>{orderItem?.product?.title}</p>
                    ))}
                  </TableCell>
                  <TableCell align="left">{item.user.firstName + ' ' + item.user.lastName}</TableCell>
                  <TableCell align="left">₹{item.totalDiscountedPrice}</TableCell>
                  <TableCell align="left">
                    <span className={`${item?.orderStatus === "CONFIRMED" ? "bg-[green]" :
                      item?.orderStatus === "SHIPPED" ? "bg-[blue]" :
                        item?.orderStatus === "PLACED" ? "bg-[gray]" :
                          item?.orderStatus === "PENDING" ? "bg-[orange]" : "bg-[red]"} text-white rounded px-5 py-2`}>
                      {item?.orderStatus}
                    </span>
                  </TableCell>
                  <TableCell align="left">
                    <Button variant="outlined">Update</Button>
                    <Button variant="outlined" color="error" onClick={(e) => { e.stopPropagation(); handleDeleteOrder(item._id) }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={sortedOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Order Details Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width:600, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2 }}>
          {selectedOrder && (
            <>
              <Typography variant="h6">Order Details</Typography>
              <Typography><strong>Order ID:</strong> {selectedOrder?._id}</Typography>
              <Typography><strong>TotalPrice:</strong> ₹{selectedOrder?.totalDiscountedPrice}</Typography>
              <Typography className='font-bold'><span className='font-bold' >Status:</span> {selectedOrder?.orderStatus}</Typography>

              <Typography sx={{ mt: 2 }}><strong>Items:</strong></Typography>
              {selectedOrder?.orderItems.map((orderItem) => (
                <Box key={orderItem?.product?._id} sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                  <Avatar src={orderItem?.product?.imageUrl} sx={{ width: 50, height: 50 }} />
                  <Typography>{orderItem?.product?.title} - ₹<span className='font-semibold'>{orderItem?.product?.discountedPrice} </span></Typography>
                  <Typography>
                    Quantity:<span className='font-semibold'>{orderItem?.quantity}</span>
                  </Typography>
                  <Typography>
                    Price:<span className='font-semibold'>{orderItem?.product?.discountedPrice  *  orderItem?.quantity}</span>
                  </Typography>
                </Box>
              ))}

              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button sx={{ bgcolor: "orange" }} variant="contained" onClick={() => handleStatusUpdate(selectedOrder._id, "PENDING")}>Pending</Button>
                <Button sx={{ bgcolor: "green" }} variant="contained" onClick={() => handleStatusUpdate(selectedOrder._id, "CONFIRM")}>Confirm</Button>
                <Button sx={{ bgcolor: "blue" }} variant="contained" onClick={() => handleStatusUpdate(selectedOrder._id, "SHIP")}>Ship</Button>
                <Button sx={{ bgcolor: "red" }} variant="contained" onClick={() => handleStatusUpdate(selectedOrder._id, "DELIVER")}>Deliver</Button>
                <Button sx={{ bgcolor: "magenta" }} variant="contained" onClick={() => handleStatusUpdate(selectedOrder._id, "CANCELLED")}>Cancel</Button>
                
                <Button variant="outlined" color="error" onClick={() => handleDeleteOrder(selectedOrder._id)}>Delete</Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default OrdersTable;
