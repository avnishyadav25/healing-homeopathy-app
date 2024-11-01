// web-app/src/pages/BlogPostPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogService from '../../../services/blogService';
import BlogPostDetail from '../../../components/public/blog/BlogPostDetail';
import Template from '../../../components/common/Template';

const BlogPostPage = () => {
  const { id } = useParams(); // This will capture either ID or permalink
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log('#### id = ', id);
        const data = await blogService.fetchBlogByIdOrPermalink(id);
        setPost(data);
      } catch (err) {
        setError('Error fetching the blog post');
      }
    };
    fetchPost();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <Template>
      <BlogPostDetail post={post} />
    </Template>
  );
};

export default BlogPostPage;
