import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../State/Admin/Auth/Action';
import { Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const CustomersTable = () => {
  const dispatch = useDispatch();
  const { adminCutomers } = useSelector(store => store); 

  useEffect(() => { 
    dispatch(getAllUsers());
  }, [dispatch]);

  console.log("Users:", adminCutomers?.users);


  return (
    <div className='p-5'>
    <Card className='mt-2'>
        <CardHeader title="All Customers"/>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Email&nbsp;</TableCell>
              <TableCell align="left">Firstname</TableCell>
              <TableCell align="left">Lastname&nbsp;</TableCell>
              {/* <TableCell align="left">Address&nbsp;</TableCell>
              <TableCell align="left">PaymentInfo&nbsp;</TableCell> */}
              <TableCell align="left">Operations&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { adminCutomers?.users.map((item) => (
              <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left" sx={{fontWeight:"bold"}}>{item.email}</TableCell>
                <TableCell align="left">{item.firstName}</TableCell>
                <TableCell align="left">{item.lastName}</TableCell>
                {/* <TableCell align="left">{item.address}</TableCell>
                <TableCell align="left">{item.paymentInfo}</TableCell> */}
                <TableCell align="left">
                  <Button variant='outlined' onClick={()=>handleCusomerDelete(item._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Card>
    </div>
  );
};

export default CustomersTable;
