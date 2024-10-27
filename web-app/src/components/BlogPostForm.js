import React, { useState } from 'react';
import axios from 'axios';

const BlogPostForm = ({ history, postId, existingPost }) => {
  const [title, setTitle] = useState(existingPost ? existingPost.title : '');
  const [content, setContent] = useState(existingPost ? existingPost.content : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postId) {
      await axios.put(`/api/posts/${postId}`, { title, content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    } else {
      await axios.post('/api/posts', { title, content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    }
    history.push('/admin');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>
      <div>
        <label>Content</label>
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
        />
      </div>
      <button type="submit">Save Post</button>
    </form>
  );
};

export default BlogPostForm;
