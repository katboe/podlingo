import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#b3d9ff',
      dark: '#5d99c6',
    },
    secondary: {
      main: '#f48fb1',
      light: '#ffc1e3',
      dark: '#bf5f82',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: {
    fontFamily: '"Arial", sans-serif',
    h1: {
      fontFamily: '"Arial", sans-serif',
    },
    h2: {
      fontFamily: '"Arial", sans-serif',
    },
    h3: {
      fontFamily: '"Arial", sans-serif',
    },
    h4: {
      fontFamily: '"Arial", sans-serif',
    },
    h5: {
      fontFamily: '"Arial", sans-serif',
    },
    h6: {
      fontFamily: '"Arial", sans-serif',
    },
    body1: {
      fontFamily: '"Arial", sans-serif',
    },
    body2: {
      fontFamily: '"Arial", sans-serif',
    },
    button: {
      fontFamily: '"Arial", sans-serif',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Arial", sans-serif',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          borderRadius: 10,
          padding: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Arial", sans-serif',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: '"Arial", sans-serif',
        },
      },
    },
  },
});

export default theme;