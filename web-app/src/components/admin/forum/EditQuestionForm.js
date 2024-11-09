// src/components/admin/forum/EditQuestionForm.js
import React, { useEffect, useState } from 'react';
import QuestionForm from './QuestionForm';
import { getQuestionDetails, createQuestion } from '../../../services/forumService';
import { useParams } from 'react-router-dom';
import AuthProvider from '../../../contexts/AuthContext';


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

  return questionData ? (
    <AuthProvider>
<QuestionForm questionData={questionData} onSubmit={handleSubmit} /> 
    </AuthProvider>
  
): null;
};

export default EditQuestionForm;
