// /src/components/admin/users/UserFormList.js
import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../../../services/userService';
import { Box, Tabs, Tab, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button, Select, MenuItem, Typography } from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const UserFormList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [tabValue, setTabValue] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
      setFilteredUsers(data);
    };
    loadUsers();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setCurrentPage(1); // Reset to the first page on tab change
    if (newValue === 'all') setFilteredUsers(users);
    else setFilteredUsers(users.filter((user) => user.role === newValue));
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((user) => user._id !== id));
    setFilteredUsers((prev) => prev.filter((user) => user._id !== id));
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleItemsPerPageChange = (event) => setItemsPerPage(event.target.value);

  return (
    <Box p={4}>
      <Box mb={2} display="flex" justifyContent="flex-end" alignItems="center">
        <Button variant="contained" color="primary" onClick={() => navigate('/admin/users/add')}>
          Create New User
        </Button>
      </Box>

      <Box mb={2} display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="body1" mr={1}>Items per page:</Typography>
        <Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          {[10, 20, 50, 100].map((count) => (
            <MenuItem key={count} value={count}>{count}</MenuItem>
          ))}
        </Select>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab label="All" value="all" />
          <Tab label="Admins" value="Admin" />
          <Tab label="Super Admins" value="Super Admin" />
          <Tab label="Doctors" value="Doctor" />
          <Tab label="Patients" value="Patient" />
          <Tab label="Customers" value="Customer" />
        </Tabs>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <IconButton onClick={() => navigate(`/admin/users/view/${user._id}`)}><Visibility /></IconButton>
                <IconButton onClick={() => navigate(`/admin/users/edit/${user._id}`)}><Edit /></IconButton>
                <IconButton color="error" onClick={() => handleDelete(user._id)}><Delete /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
        <Button onClick={handlePrevious} disabled={currentPage === 1}>Previous</Button>
        <Typography>{`Page ${currentPage} of ${totalPages}`}</Typography>
        <Button onClick={handleNext} disabled={currentPage === totalPages}>Next</Button>
      </Box>
    </Box>
  );
};

export default UserFormList;
