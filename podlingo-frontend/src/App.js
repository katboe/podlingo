import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PodcastSearch from './components/PodcastSearch';
import UserPreferences from './components/UserPreferences';
import Navbar from './components/Navbar';
import './styles.css'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PodcastSearch />} />
        <Route path="/preferences" element={<UserPreferences />} />
      </Routes>
    </Router>
  );
}

export default App;