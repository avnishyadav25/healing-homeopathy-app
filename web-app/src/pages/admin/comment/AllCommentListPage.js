import React, { useEffect, useState } from 'react';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import { fetchCommentsWithPostInfo, deleteComment } from '../../../services/commentService';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Link, Tabs, Tab, Select, MenuItem, Button } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AllCommentListPage = () => {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const loadComments = async () => {
      const data = await fetchCommentsWithPostInfo();
      setComments(data);
      setFilteredComments(data);
    };
    loadComments();
  }, []);

  const handleDelete = async (id) => {
    await deleteComment(id);
    setComments((prev) => prev.filter((comment) => comment._id !== id));
    setFilteredComments((prev) => prev.filter((comment) => comment._id !== id));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    const statusFilter = ['all', 'pending', 'approved', 'rejected', 'archived'];
    setFilteredComments(
      newValue === 0 ? comments : comments.filter(comment => comment.status === statusFilter[newValue])
    );
    setCurrentPage(1); // Reset to the first page on tab change
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value === 'All' ? filteredComments.length : parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page when page size changes
  };

  const paginatedComments = filteredComments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredComments.length / pageSize);

  return (
    <AdminPageTemplate>
      <Box p={4}>
        <Typography variant="h4" gutterBottom>All Comments</Typography>
        
        <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth" sx={{ mb: 3 }}>
          <Tab label="All Comments" />
          <Tab label="Pending" />
          <Tab label="Approved" />
          <Tab label="Rejected" />
          <Tab label="Archived" />
        </Tabs>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography>Page Size:</Typography>
          <Select value={pageSize} onChange={handlePageSizeChange}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value="All">All</MenuItem>
          </Select>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Post Name</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedComments.map((comment) => (
              <TableRow key={comment._id}>
                <TableCell>
                  <Link component="button" onClick={() => navigate(`/admin/comments/post/${comment.postId}`)}>
                    {comment.postName}
                  </Link>
                </TableCell>
                <TableCell>{comment.name}</TableCell>
                <TableCell>{comment.text}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => navigate(`/admin/comments/view/${comment._id}`)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => navigate(`/admin/comments/edit/${comment._id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(comment._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
          <Button
            variant="contained"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Typography>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            variant="contained"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </Box>
      </Box>
    </AdminPageTemplate>
  );
};

export default AllCommentListPage;
