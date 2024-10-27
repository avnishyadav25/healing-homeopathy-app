// src/components/SectionDivider.js

import React from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

const SectionDivider = ({ color = "#ddd", thickness = "2px", margin = "20px 0" }) => {
  return (
    <Box sx={{ margin }}>
      <Divider sx={{ borderColor: color, borderWidth: thickness }} />
    </Box>
  );
};

export default SectionDivider;
