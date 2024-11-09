// src/components/shared/CategorySelector.js
import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Autocomplete } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { fetchCategories, createOrUpdateCategories } from '../../services/categoryService';

const CategorySelector = ({ categories = [], setCategories }) => {
  const [allCategories, setAllCategories] = useState([]);
  const [inputValueCategory, setInputValueCategory] = useState('');

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setAllCategories(Array.isArray(fetchedCategories) ? fetchedCategories : []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setAllCategories([]);
      }
    };
    fetchAllCategories();
  }, []);

  const addInputValueAsCategory = async () => {
    if (inputValueCategory.trim()) {
      const newCategories = inputValueCategory.split(',').map(cat => cat.trim()).filter(cat => cat);
      try {
        const updatedCategories = await createOrUpdateCategories(newCategories);
        setAllCategories((prev) => [...prev, ...updatedCategories]);
        setCategories((prev) => [...(prev || []), ...updatedCategories.map(cat => cat._id || cat)]);
      } catch (error) {
        console.error("Failed to add or update categories:", error);
      }
      setInputValueCategory('');
    }
  };

  return (
    <Autocomplete
      multiple
      freeSolo
      options={allCategories}
      getOptionLabel={(option) => option?.name || ""}
      value={(categories || []).map((cat) => allCategories.find((item) => item._id === cat) || { _id: cat, name: cat })}
      onChange={(e, newCategories) => setCategories(newCategories.map((cat) => cat._id || cat))}
      inputValue={inputValueCategory}
      onInputChange={(e, newInputValue) => setInputValueCategory(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Category"
          placeholder="Select or add categories"
          helperText="Enter categories separated by commas"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              addInputValueAsCategory();
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {params.InputProps.endAdornment}
                <IconButton size="small" onClick={addInputValueAsCategory}>
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

export default CategorySelector;
