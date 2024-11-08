
// src/components/admin/forum/AddQuestionForm.js
import React from 'react';
import QuestionForm from './QuestionForm';
import { createQuestion } from '../../../services/forumService';

const AddQuestionForm = () => {
  const handleSubmit = (question) => {
    createQuestion(question);
  };

  return <QuestionForm onSubmit={handleSubmit} />;
};

export default AddQuestionForm;
