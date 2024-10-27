// /src/components/admin/tabs/ProductsTab.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import axios from 'axios';


const apiUrl = process.env.REACT_APP_API_URL;

const ProductsTab = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(apiUrl+'/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Products</Typography>
      {products.map((product) => (
        <Paper key={product._id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">{product.name}</Typography>
          <Typography>{product.price}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default ProductsTab;
