
// src/components/admin/forum/AddQuestionForm.js
import React from 'react';
import QuestionForm from './QuestionForm';
import { createQuestion } from '../../../services/forumService';
import AuthProvider from '../../../contexts/AuthContext';


const AddQuestionForm = () => {
  const handleSubmit = (question) => {
    createQuestion(question);
  };

  return (
  <AuthProvider>
    <QuestionForm onSubmit={handleSubmit} />
    </AuthProvider>);
};

export default AddQuestionForm;
