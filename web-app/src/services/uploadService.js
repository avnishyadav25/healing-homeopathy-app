// /src/services/uploadService.js
import axios from 'axios';

const uploadFile = async (file, folder = 'default', imageName) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);
  console.log('### imageName',imageName);
  formData.append('imageName', imageName);
  console.log('### file',file);
  console.log('### folder',folder);

  try {
    console.log('### formData',formData);
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('### response.data.filePath',response.data.filePath);
    return response.data.filePath; // Assume response contains the file path
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
};

export default uploadFile;
