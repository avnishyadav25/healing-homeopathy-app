// /src/components/admin/tags/TagList.js

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, TableFooter, TablePagination, Paper, Typography } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TagList = ({ tags, onDelete, onPageChange, totalPages, currentPage, rowsPerPage, onRowsPerPageChange }) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => navigate('/admin/tags/add')}>
        Create New Tag
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Blog Count</TableCell>
            <TableCell>Forum Count</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tags.length > 0 ? (
            tags.map((tag) => (
              <TableRow key={tag._id}>
                <TableCell>{tag.name}</TableCell>
                <TableCell>{tag.description}</TableCell>
                <TableCell>{tag.blogCount}</TableCell>
                <TableCell>{tag.forumCount}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => navigate(`/admin/tags/view/${tag._id}`)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => navigate(`/admin/tags/edit/${tag._id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(tag._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography variant="body1" align="center">No tags found.</Typography>
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
    </TableContainer>
  );
};

export default TagList;
