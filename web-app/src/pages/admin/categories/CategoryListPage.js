// /src/pages/admin/categories/CategoryListPage.js

import React, { useEffect, useState } from 'react';
import { getAllCategories, deleteCategory } from '../../../services/categoryService';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import CategoryList from '../../../components/admin/categories/CategoryList';

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadCategories();
  }, [currentPage]);

  const loadCategories = async () => {
    const { data, totalPages } = await getAllCategories(currentPage);
    setCategories(data);
    setTotalPages(totalPages);
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    loadCategories();
  };

  return (
    <AdminPageTemplate title="Category Management">
      <CategoryList categories={categories} onDelete={handleDelete} onPageChange={(e, page) => setCurrentPage(page)} totalPages={totalPages} currentPage={currentPage} />
    </AdminPageTemplate>
  );
};

export default CategoryListPage;
