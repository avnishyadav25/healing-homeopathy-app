import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Tabs, Tab, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TableFooter, TablePagination, Button, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const AllBlogs = () => {
  const [tabValue, setTabValue] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedBlogs, setSelectedBlogs] = useState([]); // To manage selected rows for bulk actions

  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(0); // Reset to the first page on tab change
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        let status;
        switch (tabValue) {
          case 1:
            status = 'published';
            break;
          case 2:
            status = 'draft';
            break;
          case 3:
            status = 'scheduled';
            break;
          case 4:
            status = 'archived';
            break;
          default:
            status = '';
        }

        const response = await axios.get(`${apiUrl}/blogs`, {
          params: { status, page: page + 1, limit: rowsPerPage }
        });
        setBlogs(response.data.blogs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [tabValue, page, rowsPerPage]); // Refetch blogs when tab, page, or rowsPerPage changes

  const handleEditBlog = async (blogId) => {
    try {
      const response = await axios.get(`${apiUrl}/blogs/${blogId}`);
      const blogData = response.data;

      // Navigate to CreateBlog with prepopulated data
      navigate('/admin/blogs/edit', { state: { blogData } });
    } catch (error) {
      console.error('Error fetching blog data for editing:', error);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    // Logic to delete the blog
  };

  const handleArchiveBlog = async (blogId) => {
    // Logic to archive the blog
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = blogs.map((blog) => blog._id);
      setSelectedBlogs(newSelecteds);
      return;
    }
    setSelectedBlogs([]);
  };

  const handleCheckboxClick = (event, blogId) => {
    const selectedIndex = selectedBlogs.indexOf(blogId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedBlogs, blogId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedBlogs.slice(1));
    } else if (selectedIndex === selectedBlogs.length - 1) {
      newSelected = newSelected.concat(selectedBlogs.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedBlogs.slice(0, selectedIndex),
        selectedBlogs.slice(selectedIndex + 1)
      );
    }

    setSelectedBlogs(newSelected);
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
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="All Blogs" />
          <Tab label="Published Blogs" />
          <Tab label="Draft Blogs" />
          <Tab label="Scheduled Blogs" />
          <Tab label="Archive Blogs" />
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
                      onChange={handleSelectAllClick}
                      inputProps={{ 'aria-label': 'select all blogs' }}
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
                {blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <TableRow key={blog._id} hover style={{ cursor: 'pointer' }} selected={selectedBlogs.indexOf(blog._id) !== -1}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedBlogs.indexOf(blog._id) !== -1}
                          onChange={(event) => handleCheckboxClick(event, blog._id)}
                          inputProps={{ 'aria-labelledby': `enhanced-table-checkbox-${blog._id}` }}
                        />
                      </TableCell>
                      <TableCell>
                        {blog.featuredImage ? (
                          <img src={`${apiUrl}${blog.featuredImage}`} alt={blog.title} style={{ width: 40, height: 40 }} />
                        ) : (
                          <Typography variant="body2" color="text.secondary">No Image</Typography>
                        )}
                      </TableCell>
                      <TableCell>{blog.title}</TableCell>
                      <TableCell>{blog.status || 'Unknown'}</TableCell>
                      <TableCell>{new Date(blog.publishTime).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEditBlog(blog._id)}>
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No blogs available for this category.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={6}
                    count={totalPages * rowsPerPage}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={() => (
                      <Box display="flex" justifyContent="space-between" flexGrow={1}>
                        <Typography variant="body2">Page {page + 1} of {totalPages}</Typography>
                      </Box>
                    )}
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