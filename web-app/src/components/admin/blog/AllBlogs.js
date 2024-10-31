// src/components/admin/blog/AllBlogs.js
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Tabs, Tab, CircularProgress, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, TableFooter, TablePagination, Button, Checkbox
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import blogService from '../../../services/blogService';


const apiUrl = process.env.REACT_APP_API_URL;

const AllBlogs = () => {
  const [tabValue, setTabValue] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const statusMap = ['', 'published', 'draft', 'scheduled', 'archived'];
        const status = statusMap[tabValue];
        const response = await blogService.fetchBlogs({ status, page: page + 1, limit: rowsPerPage });
        setBlogs(response.blogs);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [tabValue, page, rowsPerPage]);

  const handleTabChange = (event, newValue) => setTabValue(newValue);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => setRowsPerPage(parseInt(event.target.value, 10));

  //const handleEditBlog = (blog) => navigate('/admin/blogs/edit', { state: { blogData: blog } });
  const handleEditBlog = (blog) => navigate(`/admin/blogs/edit/${blog._id}`, { state: { blogData: blog } });

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.deleteBlog(blogId);
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const handleArchiveBlog = async (blogId) => {
    try {
      await blogService.archiveBlog(blogId);
      setBlogs(blogs.map((blog) => (blog._id === blogId ? { ...blog, status: 'archived' } : blog)));
    } catch (error) {
      console.error('Error archiving blog:', error);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">All Blogs</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => navigate('/admin/blogs/create')}>
          Create New Blog
        </Button>
      </Box>
      <Paper>
        <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab label="All Blogs" />
          <Tab label="Published Blogs" />
          <Tab label="Draft Blogs" />
          <Tab label="Scheduled Blogs" />
          <Tab label="Archived Blogs" />
        </Tabs>

        {loading ? (
          <Box display="flex" justifyContent="center" p={2}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selectedBlogs.length > 0 && selectedBlogs.length < blogs.length}
                      checked={blogs.length > 0 && selectedBlogs.length === blogs.length}
                      onChange={(event) => setSelectedBlogs(event.target.checked ? blogs.map((blog) => blog._id) : [])}
                    />
                  </TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog._id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedBlogs.includes(blog._id)}
                        onChange={(event) => setSelectedBlogs(event.target.checked ? [...selectedBlogs, blog._id] : selectedBlogs.filter((id) => id !== blog._id))}
                      />
                    </TableCell>
                    <TableCell>
                      {blog.featuredImage ? (
                        <img src={`${apiUrl}${blog.featuredImage}`} alt={blog.title} style={{ width: 40, height: 40 }} />
                      ) : (
                        <Typography variant="body2" color="text.secondary">No Image</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" onClick={() => handleEditBlog(blog)} style={{ cursor: 'pointer' }}>
                        {blog.title}
                      </Typography>
                    </TableCell>
                    <TableCell>{blog.status || 'Unknown'}</TableCell>
                    <TableCell>{new Date(blog.publishTime).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditBlog(blog)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteBlog(blog._id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleArchiveBlog(blog._id)}>
                        <ArchiveIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={totalPages * rowsPerPage}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default AllBlogs;
