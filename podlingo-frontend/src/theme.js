// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Light blue for primary elements
    },
    secondary: {
      main: '#f48fb1', // Light pink for secondary elements
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1e1e1e', // Slightly lighter paper background
    },
    text: {
      primary: '#ffffff', // White text for primary text
      secondary: '#b0bec5', // Light gray for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    // Add more typography styles as needed
  },
});

export default theme;