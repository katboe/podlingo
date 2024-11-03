import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PodcastSearch from './components/PodcastSearch';
import UserLanguages from './components/UserLanguages/index';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import Navbar from './components/Navbar';
//import './styles.css'; 

function App() {
  return (
      <Router>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Routes>
            <Route path="/" element={<PodcastSearch />} />
            <Route path="/settings" element={<UserLanguages />} />
          </Routes>
        </ThemeProvider>
      </Router>
  );
}

export default App;