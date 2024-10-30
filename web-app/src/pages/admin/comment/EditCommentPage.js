// /src/pages/admin/comment/EditCommentPage.js
import React, { useEffect, useState } from 'react';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import CommentForm from '../../../components/admin/comment/CommentForm';
import { fetchCommentById, updateComment } from '../../../services/commentService';
import { useParams, useNavigate } from 'react-router-dom';

const EditCommentPage = () => {
  const { id } = useParams();
  const [comment, setComment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadComment = async () => {
      const data = await fetchCommentById(id);
      setComment(data);
    };
    loadComment();
  }, [id]);

  const handleSubmit = async (data) => {
    await updateComment(id, data);
    navigate(`/admin/comments`);
  };

  return (
    <AdminPageTemplate>
      {comment && <CommentForm initialData={comment} onSubmit={handleSubmit} isEditMode />}
    </AdminPageTemplate>
  );
};

export default EditCommentPage;
