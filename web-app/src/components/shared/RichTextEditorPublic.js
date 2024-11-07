// src/components/shared/RichTextEditorPublic.js
import React, { useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';

const RichTextEditorPublic = ({ value, onChange, disabled, config }) => {
  const editorRef = useRef(null);

  const defaultConfig = {
    minHeight: 300,
    readonly: disabled, // Make the editor read-only if disabled is true
    toolbarSticky: false,
    toolbar: ["bold", "italic", "underline", "|", "ul", "ol", "|", "link", "image"],
    ...config, // Merge with any additional config passed as props
  };

  // Update the editor content when the `value` prop changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.value !== value) {
      editorRef.current.value = value;
    }
  }, [value]);

  const handleEditorChange = (newContent) => {
    if (onChange) onChange(newContent);
  };

  return (
    <JoditEditor
      ref={editorRef}
      value={value}
      config={defaultConfig}
      onBlur={handleEditorChange} // Use onBlur to trigger `onChange` on editor focus loss
    />
  );
};

export default RichTextEditorPublic;
