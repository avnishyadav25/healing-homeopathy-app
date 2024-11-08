// /src/pages/admin/categories/CategoryListPage.js

import React, { useEffect, useState } from 'react';
import { getAllCategories, deleteCategory } from '../../../services/categoryService';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import CategoryList from '../../../components/admin/categories/CategoryList';

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadCategories();
  }, [page, rowsPerPage]);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const { data, pages } = await getAllCategories(page + 1, rowsPerPage);
      setCategories(data);
      setTotalPages(pages);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(id);
      loadCategories();
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => setRowsPerPage(parseInt(event.target.value, 10));

  return (
    <AdminPageTemplate title="Category Management">
      <CategoryList
        categories={categories}
        onDelete={handleDelete}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        currentPage={page}
        onRowsPerPageChange={handleChangeRowsPerPage}
        loading={loading}
      />
    </AdminPageTemplate>
  );
};

export default CategoryListPage;
