// /src/components/admin/categories/CategoryList.js

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box, TableFooter, TablePagination, Button, CircularProgress } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CategoryList = ({ categories, onDelete, onPageChange, totalPages, currentPage, rowsPerPage, onRowsPerPageChange, loading }) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Box display="flex" justifyContent="flex-end" m={2}>
        <Button variant="contained" color="primary" onClick={() => navigate('/admin/categories/add')}>Create New Category</Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Name</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => navigate(`/admin/categories/view/${category._id}`)}><Visibility /></IconButton>
                    <IconButton color="secondary" onClick={() => navigate(`/admin/categories/edit/${category._id}`)}><Edit /></IconButton>
                    <IconButton color="error" onClick={() => onDelete(category._id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="body1" align="center">No categories found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={totalPages * rowsPerPage}
                rowsPerPage={rowsPerPage}
                page={currentPage}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
              />
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </TableContainer>
  );
};

export default CategoryList;
