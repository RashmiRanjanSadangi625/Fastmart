import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { deleteProduct, findProducts } from "../../State/Product/Action";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Card, CardHeader, TableSortLabel } from "@mui/material";
import Pagination from '@mui/material/Pagination';



const ProductsTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;




  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: "price",
    direction: "asc",
  });

  // Fetch products initially
  useEffect(() => {
    const data = {
      category: "",
      colors: [],
      sizes: [],
      minPrice: null,
      maxPrice: null,
      minDiscount: 0,
      sort: "price-low",
      pageNumber: page,
      pageSize: rowsPerPage,
      stock: "",
    };
    dispatch(findProducts(data));
  }, [dispatch, page]);
  
  

  // Handle delete product
  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  // Handle sorting when clicking table headers
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Sort the products list dynamically
  const sortedProducts = [...(products?.products?.content || [])].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  const filteredProducts = (products?.products?.content || []).filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const paginatedProducts = filteredProducts;

  

  return (
    <div className="p-5">
      <div className="flex justify-end items-center px-5 py-3">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1); // Reset to page 1 on search
          }}
          className="border rounded px-3 py-1 outline-none"
        />
      </div>

      <Card className="mt-2">
        <CardHeader title="All Products" />
        <div className="flex items-center justify-end px-5">
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="products table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortConfig.key === "category.name"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("category.name")}
                  >
                    Category
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortConfig.key === "price"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("price")}
                  >
                    Price
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortConfig.key === "quantity"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("quantity")}
                  >
                    Quantity
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {paginatedProducts.map((item) => (
              <TableRow key={item._id}>
                <TableCell><Avatar src={item.imageUrl} /></TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.category?.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <Button onClick={() => handleProductDelete(item._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          </Table>
        </TableContainer>
      </Card>
      <div className="flex justify-end p-4">
        <Pagination
          count={products?.products?.totalPages || 1}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
          shape="rounded"
          size="large"
        />
      </div>
    </div>
  );
};

export default ProductsTable;
