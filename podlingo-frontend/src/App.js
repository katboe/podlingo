import React from 'react';
import PodcastList from './components/PodcastList';
import AddPodcast from './components/AddPodcast';
import './styles.css'; 

function App() {
  return (
    <div className="App">
      <header>
        <h1>Podcast Finder</h1>
      </header>

      {/* Section to add a new podcast */}
      <section>
        <h2>Add a New Podcast</h2>
        <AddPodcast />
      </section>

      {/* Section to display the list of podcasts */}
      <section>
        <h2>Available Podcasts</h2>
        <PodcastList />
      </section>
    </div>
  );
}

export default App;