// /src/controllers/uploadController.js
const path = require('path');
const fs = require('fs');

const uploadFile = (req, res) => {
  const { folder, imageName } = req.body; // Get folder and imageName from the form data
  const tempFilePath = req.file.path; // Temporary file path
  const fileName = imageName || req.file.filename; // Use imageName if provided, else use the original filename
  console.log('#### folder1 = ', folder);
  console.log('#### tempFilePath1 = ', tempFilePath);
  console.log('#### fileName1 = ', fileName);
  console.log('#### imageName1 = ', imageName);

  if (!folder) {
    return res.status(400).json({ message: 'Folder is required' });
  }

  // Define the final destination path
  const finalPath = path.join(__dirname, '../../../web-app/public/assets', folder);
  if (!fs.existsSync(finalPath)) {
    fs.mkdirSync(finalPath, { recursive: true });
  }

  const finalFilePath = path.join(finalPath, fileName);

  // Move file from temp path to final path
  fs.rename(tempFilePath, finalFilePath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error moving file', error: err });
    }
    res.status(200).json({ filePath: `/assets/${folder}/${fileName}` });
  });
};

module.exports = { uploadFile };
