// src/pages/MedicineDeliveryPage.js

import React, { useState, useEffect } from 'react';
import NavigationBar from '../../../components/common/NavigationBar';
import CoverSection from '../../../components/CoverSection';
import ProductList from '../../../components/ProductList';
import Footer from '../../../components/common/Footer';
import coverImage from '../../assets/medicine-delivery-cover.jpg'; // Use an appropriate cover image

const MedicineDeliveryPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from an API or use static data
    const fetchProducts = async () => {
      // Example of fetching from a local JSON or API endpoint
      const response = await fetch('/api/products'); // Replace with actual API endpoint
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <CoverSection 
        title="Medicine Delivery" 
        subtitle="Get your homeopathic medicines delivered to your doorstep" 
        image={coverImage} 
      />
      <div className="py-5">
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default MedicineDeliveryPage;
