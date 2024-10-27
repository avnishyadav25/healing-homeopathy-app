// web-app/src/pages/BlogPostPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogPostDetail from '../../components/BlogPostDetail'; // Import the new component
import Template from '../../components/common/Template';


const apiUrl = process.env.REACT_APP_API_URL; // Use API URL from environment variables
console.log('API URL:', apiUrl); // Add this line to verify the API URL

const BlogPostPage = () => {
  const { id } = useParams(); // Get the `id` from URL parameters
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${apiUrl}/blogs/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching the blog post:', error);
      }
    };
    fetchPost();
  }, [id]);

  /*if (!post) return <div>Loading...</div>;*/
  if (!post) return <div>Loading...</div>;
if (post.error) return <div>Error loading blog post: {post.error.message}</div>;

  return (
    <div>
      <Template>

        <BlogPostDetail post={post} /> {/* Use the new component */}
      </Template>
      
    </div>
  );
};

export default BlogPostPage;