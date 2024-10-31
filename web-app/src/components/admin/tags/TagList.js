// /src/components/admin/tags/TagList.js

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Pagination, Stack } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getAllTags } from '../../../services/tagService';

const TagList = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch tags when component mounts or page changes
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data, totalPages } = await getAllTags(currentPage);
        setTags(data);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <TableContainer>
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
          {tags.map((tag) => (
            <TableRow key={tag._id}>
              <TableCell>{tag.name}</TableCell>
              <TableCell>{tag.description}</TableCell>
              <TableCell>{tag.blogCount}</TableCell>
              <TableCell>{tag.forumCount}</TableCell>
              <TableCell>
                <IconButton onClick={() => navigate(`/admin/tags/view/${tag._id}`)}>
                  <Visibility />
                </IconButton>
                <IconButton onClick={() => navigate(`/admin/tags/edit/${tag._id}`)}>
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Stack spacing={2} mt={2} alignItems="center">
        <Pagination count={totalPages} page={currentPage} onChange={(e, page) => handlePageChange(page)} color="primary" />
      </Stack>
    </TableContainer>
  );
};

export default TagList;
