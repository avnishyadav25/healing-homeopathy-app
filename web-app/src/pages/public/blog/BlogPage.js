// src/pages/BlogPage.js

import React from 'react';
import BlogPostList from '../../../components/public/blog/BlogPostList';
import LatestBlog from '../../../components/public/blog/LatestBlog';
import Template from '../../../components/common/Template';
import CoverSection from '../../../components/public/common/CoverSection';
import homepageCoverImage from '../../../assets/homepage-cover.jpg'; // Ensure you have an appropriate image


const BlogPage = () => {
  return (
    <div>
      <Template>
      <CoverSection 
        title="Welcome to Healing Homoeopathy' Blogs" 
        subtitle="At Healing Homoeopathy, we believe in the power of nature to heal. Our practice is dedicated to providing personalized homeopathic treatments that address the root cause of your health concerns. With a focus on holistic wellness, we offer natural remedies that are tailored to your individual needs, helping you achieve a balanced and healthy life." 
        image={homepageCoverImage}
      />
        <BlogPostList />
        <LatestBlog />
      </Template>
    </div>
  );
};

export default BlogPage;

