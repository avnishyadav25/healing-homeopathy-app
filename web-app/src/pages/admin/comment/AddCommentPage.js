// /src/pages/admin/comment/AddCommentPage.js
import React from 'react';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import CommentForm from '../../../components/admin/comment/CommentForm';
import { createComment } from '../../../services/commentService';
import { useNavigate, useParams } from 'react-router-dom';

const AddCommentPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await createComment({ ...data, postId });
    navigate(`/admin/comments/${postId}`);
  };

  return (
    <AdminPageTemplate>
      <CommentForm onSubmit={handleSubmit} />
    </AdminPageTemplate>
  );
};

export default AddCommentPage;
