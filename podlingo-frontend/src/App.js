import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Container, CssBaseline } from '@mui/material';
import theme from './theme';
import Navbar from './components/Navbar';
import PodcastSearch from './components/PodcastSearch';
import UserLanguagesWithErrorBoundary from './components/UserLanguages/WithErrorBoundary';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          minHeight: '100vh',
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Navbar />
          <Container 
            maxWidth={false} 
            sx={{ 
              flex: 1,
              px: { xs: 2, sm: 4, md: 6 }, // Responsive padding
              py: 3,
              maxWidth: '1800px', // Maximum width to prevent excessive stretching
              mx: 'auto' // Center the container
            }}
          >
            <Routes>
              <Route path="/" element={<PodcastSearch />} />
              <Route path="/settings" element={<UserLanguagesWithErrorBoundary />} />
            </Routes>
          </Container>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App; 