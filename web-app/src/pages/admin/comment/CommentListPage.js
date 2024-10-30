import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCommentsByPostId, updateCommentStatus, likeComment, createComment, updateComment } from '../../../services/commentService';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tabs, Tab, Select, MenuItem, TextField, Button } from '@mui/material';
import { ThumbUp, Reply, Check, Close, Archive, Edit } from '@mui/icons-material';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';

const CommentListPage = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [postName, setPostName] = useState('');
  const [filteredComments, setFilteredComments] = useState([]);
  const [tabValue, setTabValue] = useState('all');
  const [replyingTo, setReplyingTo] = useState(null);
  const [editing, setEditing] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [editText, setEditText] = useState('');

  // Pagination states
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedComments, setPaginatedComments] = useState([]);

  useEffect(() => {
    const loadComments = async () => {
      const data = await fetchCommentsByPostId(postId);
      setComments(data);
      setFilteredComments(data);
      setPaginatedComments(data.slice(0, pageSize));
      if (data.length > 0) {
        setPostName(data[0].postName);
      }
    };
    loadComments();
  }, [postId, pageSize]);

  const handlePageSizeChange = (event) => {
    const newSize = event.target.value;
    setPageSize(newSize === 'All' ? comments.length : parseInt(newSize, 10));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const startIndex = (newPage - 1) * pageSize;
    const endIndex = newPage * pageSize;
    setPaginatedComments(filteredComments.slice(startIndex, endIndex));
  };

  const handleStatusChange = async (id, status) => {
    await updateCommentStatus(id, status);
    setComments((prev) =>
      prev.map((comment) => (comment._id === id ? { ...comment, status } : comment))
    );
  };

  const handleLike = async (id) => {
    await likeComment(id);
    setComments((prev) =>
      prev.map((comment) => (comment._id === id ? { ...comment, likes: (comment.likes || 0) + 1 } : comment))
    );
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    const filtered = newValue === 'all' ? comments : comments.filter((comment) => comment.status === newValue);
    setFilteredComments(filtered);
    setCurrentPage(1);
    setPaginatedComments(filtered.slice(0, pageSize));
  };

  const handleReply = (commentId) => {
    setReplyingTo(commentId);
  };

  const submitReply = async () => {
    const replyData = {
      name: 'Healing Homoeopathy Admin',
      email: 'admin@healingHomoeopathy.com',
      text: replyText,
      postId,
      parentId: replyingTo,
      status: 'approved',
    };
    await createComment(replyData);
    setReplyText('');
    setReplyingTo(null);
    const updatedComments = await fetchCommentsByPostId(postId);
    setComments(updatedComments);
    setFilteredComments(updatedComments);
  };

  const handleEdit = (commentId, text) => {
    setEditing(commentId);
    setEditText(text);
  };

  const submitEdit = async (commentId) => {
    await updateComment(commentId, { text: editText });
    setEditing(null);
    setEditText('');
    const updatedComments = await fetchCommentsByPostId(postId);
    setComments(updatedComments);
    setFilteredComments(updatedComments);
  };

  return (
    <AdminPageTemplate>
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Comments for Post: {postName}
        </Typography>
        
        <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
          <Tab label="All Comments" value="all" />
          <Tab label="Pending" value="pending" />
          <Tab label="Approved" value="approved" />
          <Tab label="Rejected" value="rejected" />
          <Tab label="Archived" value="archived" />
        </Tabs>

        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
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
              <TableCell>Name</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Likes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedComments.map((comment) => (
              <React.Fragment key={comment._id}>
                <TableRow>
                  <TableCell>{comment.name}</TableCell>
                  <TableCell>
                    {editing === comment._id ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                    ) : (
                      comment.text
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={comment.status}
                      onChange={(e) => handleStatusChange(comment._id, e.target.value)}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="approved">Approved</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
                      <MenuItem value="archived">Archived</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>{comment.likes || 0}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleLike(comment._id)}>
                      <ThumbUp />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleReply(comment._id)}>
                      <Reply />
                    </IconButton>
                    {editing === comment._id ? (
                      <Button onClick={() => submitEdit(comment._id)} color="primary">Save</Button>
                    ) : (
                      <IconButton color="default" onClick={() => handleEdit(comment._id, comment.text)}>
                        <Edit />
                      </IconButton>
                    )}
                    <IconButton color="success" onClick={() => handleStatusChange(comment._id, 'approved')}>
                      <Check />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleStatusChange(comment._id, 'rejected')}>
                      <Close />
                    </IconButton>
                    <IconButton color="default" onClick={() => handleStatusChange(comment._id, 'archived')}>
                      <Archive />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
          <Button
            variant="contained"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Typography>
            Page {currentPage} of {Math.ceil(filteredComments.length / pageSize)}
          </Typography>
          <Button
            variant="contained"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= Math.ceil(filteredComments.length / pageSize)}
          >
            Next
          </Button>
        </Box>
      </Box>
    </AdminPageTemplate>
  );
};

export default CommentListPage;
