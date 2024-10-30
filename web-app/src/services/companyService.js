// src/services/companyService.js
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// Fetch company information
export const fetchCompanyInfo = async () => {
  try {
    const response = await axios.get(`${apiUrl}/company`);
    return response.data;
  } catch (error) {
    console.error('Error fetching company info:', error);
    throw error;
  }
};

// Create company information
export const createCompanyInfo = async (companyData) => {
  try {
    const formData = new FormData();
    for (const key in companyData) {
      if (key === 'images' && Array.isArray(companyData.images)) {
        companyData.images.forEach((image) => {
          formData.append('images', image);
        });
      } else if (key === 'logo' && companyData.logo instanceof File) {
        formData.append('logo', companyData.logo);
      } else {
        formData.append(key, companyData[key]);
      }
    }

    const response = await axios.post(`${apiUrl}/company`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('#### response.data = ',response.data);
    return response.data;
  } catch (error) {
    console.error('#### Error creating company info:', error);
    throw error;
  }
};

// Update company information
export const updateCompanyInfo = async (id, updatedData) => {
  try {
    const formData = new FormData();
    for (const key in updatedData) {
      if (key === 'images' && Array.isArray(updatedData.images)) {
        updatedData.images.forEach((image) => {
          formData.append('images', image);
        });
      } else if (key === 'logo' && updatedData.logo instanceof File) {
        formData.append('logo', updatedData.logo);
      } else {
        formData.append(key, updatedData[key]);
      }
    }

    const response = await axios.put(`${apiUrl}/company/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('#### response.data update= ', response.data);
    return response.data;
  } catch (error) {
    console.error('#### update Error updating company info:', error);
    throw error;
  }
};
