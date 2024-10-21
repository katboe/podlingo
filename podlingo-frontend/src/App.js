import React from 'react';
import PodcastSearch from './components/PodcastSearch';
import './styles.css'; 

function App() {
  return (
    <div className="App">
      <header>
        <h1>Language Podcast Finder</h1>
      </header>

      {/* Section to search for podcasts */}
      <section>
        <PodcastSearch />
      </section>

    </div>
  );
}

export default App;