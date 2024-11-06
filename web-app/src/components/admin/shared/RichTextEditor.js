// src/components/shared/RichTextEditor.js
import React, { useRef, useState } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import JoditEditor from 'jodit-react';
import uploadFile from '../../../services/uploadService';

const apiUrl = process.env.REACT_APP_API_URL;

const RichTextEditor = ({ content, setContent, title, permalink }) => {
  const editor = useRef(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const editorConfig = {
    readonly: false,
    uploader: {
      insertImageAsBase64URI: false,
      url: `${apiUrl}/upload`,
      isSuccess: (resp) => resp.success,
      process: async (files) => {
        const file = files[0];
        if (!title || !permalink) {
          setSnackbar({
            open: true,
            message: 'Please provide a title and permalink before uploading media.',
            severity: 'warning',
          });
          return;
        }
        try {
          const fileExtension = file.type.split('/')[1];
          const fileName = `${permalink}-${Date.now()}.${fileExtension}`;
          const folderPath = `blog/${permalink}`;
          const fileUrl = await uploadFile(file, folderPath, fileName);
          return {
            success: true,
            message: 'File uploaded successfully',
            data: {
              files: [{ url: `${apiUrl}${fileUrl}` }],
            },
          };
        } catch (error) {
          console.error('Error uploading media:', error);
          return {
            success: false,
            message: 'Error uploading file.',
          };
        }
      },
    },
    events: {
      afterUpload(response) {
        if (response.success) {
          const { url } = response.data.files[0];
          editor.current?.selection.insertImage(url, null, 300);
        } else {
          setSnackbar({
            open: true,
            message: response.message || 'Failed to upload media',
            severity: 'error',
          });
        }
      },
    },
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  return (
    <Box sx={{ border: '1px solid #ddd' }}>
      <JoditEditor
        ref={editor}
        value={content}
        onBlur={(newContent) => setContent(newContent)}
        config={editorConfig}
        tabIndex={1}
      />
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RichTextEditor;
