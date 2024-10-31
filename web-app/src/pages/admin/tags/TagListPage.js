// Example: /src/pages/admin/tags/TagListPage.js

import React, { useEffect, useState } from 'react';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import TagList from '../../../components/admin/tags/TagList';
import { getAllTags } from '../../../services/tagService';

const TagListPage = () => {
  const [tags, setTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTags = async () => {
      const { data, pages } = await getAllTags(currentPage);
      console.log('### data', data);
      setTags(data);
      setTotalPages(pages);
    };
    fetchTags();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <AdminPageTemplate title="Tags">
      <TagList tags={tags} onPageChange={handlePageChange} totalPages={totalPages} currentPage={currentPage} />
    </AdminPageTemplate>
  );
};

export default TagListPage;
