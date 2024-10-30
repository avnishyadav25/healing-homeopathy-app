// /src/components/admin/comments/CommentList.js
import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';

const CommentList = ({ comments, onView, onEdit, onDelete }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>Comment</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {comments.map((comment) => (
        <TableRow key={comment._id}>
          <TableCell>{comment.name}</TableCell>
          <TableCell>{comment.email}</TableCell>
          <TableCell>{comment.phone}</TableCell>
          <TableCell>{comment.text}</TableCell>
          <TableCell>
            <IconButton color="primary" onClick={() => onView(comment._id)}>
              <Visibility />
            </IconButton>
            <IconButton color="secondary" onClick={() => onEdit(comment._id)}>
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={() => onDelete(comment._id)}>
              <Delete />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default CommentList;
