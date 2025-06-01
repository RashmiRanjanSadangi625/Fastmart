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
import { Avatar, Button, Card, CardHeader } from '@mui/material';

const DashboardProductsView = () => {
  const dispatch=useDispatch();

  const {products}=useSelector(store=>store);

  console.log("products",products);

  const handleProductDelete=(productId)=>
  {
    dispatch(deleteProduct(productId))

  }

  console.log("products",products);

  useEffect(()=>{
    const data={
      category:"",
      colors: [],
      sizes: [],
      minPrice:null,
      maxPrice:null,
      minDiscount: 0,
      sort: "price-low",
      pageNumber:1,
      pageSize:20,
      stock:""
     }
     dispatch(findProducts(data));

  },[products.deletedProduct])
  return (
    <div className='p-5 shadow-lg shadow-gray-600'>
      <Card className='mt-2'>
        <CardHeader title="Recent Products"/>

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Category&nbsp;</TableCell>
            <TableCell align="left">Price&nbsp;</TableCell>
            <TableCell align="left">Quantity&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.products?.content?.slice(0,5).map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left'>
                <Avatar src={item.imageUrl}/>
              </TableCell>
              <TableCell align="left">{item.title}</TableCell>
              <TableCell align="left">{item.category.name}</TableCell>
              <TableCell align="left">{item.price}</TableCell>
              <TableCell align="left">{item.quantity}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      </Card>
      
    </div>
  )
}

export default DashboardProductsView
