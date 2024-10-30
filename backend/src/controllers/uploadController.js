const path = require('path');
const fs = require('fs');

const uploadFile = (req, res) => {
  const { folder } = req.body; // Get the folder from the form data
  const tempFilePath = req.file.path; // Temporary file path
  const fileName = req.file.filename; // The uploaded file's name

  if (!folder) {
    return res.status(400).json({ message: 'Folder is required' });
  }

  // Define the final destination path
  console.log('###folder', folder);
  const finalPath = path.join(__dirname, '../../../web-app/public/assets', folder);
  if (!fs.existsSync(finalPath)) {
    fs.mkdirSync(finalPath, { recursive: true });
  }
  console.log('###finalPath', finalPath);
  const finalFilePath = path.join(finalPath, fileName);
  console.log('###finalFilePath', finalFilePath);
  // Move file from temp path to final path
  fs.rename(tempFilePath, finalFilePath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error moving file', error: err });
    }
    res.status(200).json({ filePath: `/assets/${folder}/${fileName}` });
  });
};

module.exports = { uploadFile };
