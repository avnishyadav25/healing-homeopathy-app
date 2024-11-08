// /src/pages/admin/tags/TagListPage.js

import React, { useEffect, useState } from 'react';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import TagList from '../../../components/admin/tags/TagList';
import { getAllTags, deleteTag } from '../../../services/tagService';

const TagListPage = () => {
  const [tags, setTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadTags();
  }, [currentPage, rowsPerPage]);

  const loadTags = async () => {
    try {
      const { data, pages } = await getAllTags(currentPage + 1, rowsPerPage);
      setTags(data);
      setTotalPages(pages);
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      await deleteTag(id);
      loadTags();
    }
  };

  const handlePageChange = (event, newPage) => setCurrentPage(newPage);
  const handleRowsPerPageChange = (event) => setRowsPerPage(parseInt(event.target.value, 10));

  return (
    <AdminPageTemplate title="Tags Management">
      <TagList
        tags={tags}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        currentPage={currentPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </AdminPageTemplate>
  );
};

export default TagListPage;
