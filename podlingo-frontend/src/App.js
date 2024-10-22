import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PodcastSearch from './components/PodcastSearch';
import UserLanguages from './components/UserLanguages';
import Navbar from './components/Navbar';
import './styles.css'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PodcastSearch />} />
        <Route path="/settings" element={<UserLanguages />} />
      </Routes>
    </Router>
  );
}

export default App;