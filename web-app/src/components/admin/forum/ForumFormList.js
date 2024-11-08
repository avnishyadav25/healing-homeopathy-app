// src/components/admin/forum/ForumFormList.js
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TablePagination, Button, Tabs, Tab } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getQuestions } from '../../../services/forumService';

const ForumFormList = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuestions();
      setQuestions(data);
    };
    fetchQuestions();
  }, [page, rowsPerPage]);

  return (
    <>
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
        <Tab label="All Questions" />
        <Tab label="Archived Questions" />
        <Tab label="Replied Questions" />
      </Tabs>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>No. of Replies</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question._id}>
                <TableCell>{question.title}</TableCell>
                <TableCell>{question.urlSlug}</TableCell>
                <TableCell>{question.tags.join(', ')}</TableCell>
                <TableCell>{question.category.join(', ')}</TableCell>
                <TableCell>{question.replies.length}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/admin/forum/view/${question._id}`)}><Visibility /></IconButton>
                  <IconButton onClick={() => navigate(`/admin/forum/edit/${question._id}`)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => console.log(`Delete ${question._id}`)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={questions.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </TableContainer>
    </>
  );
};

export default ForumFormList;
