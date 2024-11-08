// src/components/admin/forum/EditQuestionForm.js
import React, { useEffect, useState } from 'react';
import QuestionForm from './QuestionForm';
import { getQuestionDetails, createQuestion } from '../../../services/forumService';
import { useParams } from 'react-router-dom';

const EditQuestionForm = () => {
  const { id } = useParams();
  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      const data = await getQuestionDetails(id);
      setQuestionData(data);
    };
    fetchQuestion();
  }, [id]);

  const handleSubmit = (question) => {
    createQuestion(question);
  };

  return questionData ? <QuestionForm questionData={questionData} onSubmit={handleSubmit} /> : null;
};

export default EditQuestionForm;
