import React from 'react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import { useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const Template = ({ children }) => {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Ensure NavigationBar spans full width */}
      <Box sx={{ width: '100%', position: 'relative' }}>
        <NavigationBar mode={mode} toggleColorMode={colorMode.toggleColorMode} />
      </Box>

      {/* Main content area */}
      <Box sx={{ flex: '1 0 auto', width: '100%' }}>
        {children}
      </Box>

      {/* Ensure Footer spans full width */}
      <Box sx={{ width: '100%', position: 'relative' }}>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Template;