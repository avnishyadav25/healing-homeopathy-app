// src/components/shared/TagSelector.js
import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Autocomplete } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { fetchTags, createOrUpdateTags } from '../../services/tagService';

const TagSelector = ({ tags = [], setTags }) => {
  const [allTags, setAllTags] = useState([]);
  const [inputValueTag, setInputValueTag] = useState('');

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const fetchedTags = await fetchTags();
        setAllTags(Array.isArray(fetchedTags) ? fetchedTags : []); // Ensure fetchedTags is an array
      } catch (error) {
        console.error("Failed to fetch tags:", error);
        setAllTags([]); // Fallback to an empty array on error
      }
    };
    fetchAllTags();
  }, []);

  const addInputValueAsTag = async () => {
    if (inputValueTag.trim()) {
      const newTags = inputValueTag.split(',').map(tag => tag.trim()).filter(tag => tag);
      try {
        const updatedTags = await createOrUpdateTags(newTags);
        setAllTags(prev => [...prev, ...updatedTags]);
        setTags((prev) => [...(prev || []), ...updatedTags.map(tag => tag._id || tag)]);
      } catch (error) {
        console.error("Failed to add or update tags:", error);
      }
      setInputValueTag('');
    }
  };

  return (
    <Autocomplete
      multiple
      freeSolo
      options={allTags}
      getOptionLabel={(option) => option?.name || ""}
      value={(tags || []).map((tag) => allTags.find((item) => item._id === tag) || { _id: tag, name: tag })}
      onChange={(e, newTags) => setTags(newTags.map((tag) => tag._id || tag))}
      inputValue={inputValueTag}
      onInputChange={(e, newInputValue) => setInputValueTag(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Tags"
          placeholder="Select or add tags"
          helperText="Enter tags separated by commas"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              addInputValueAsTag();
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {params.InputProps.endAdornment}
                <IconButton size="small" onClick={addInputValueAsTag}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default TagSelector;
