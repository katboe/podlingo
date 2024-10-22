// UserPreferences.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPreferences = () => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  useEffect(() => {
    // Fetch available languages from your API
    const fetchLanguages = async () => {
      const response = await axios.get('/api/languages');
      setLanguages(response.data);
    };

    fetchLanguages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update user preferences
    await axios.post('/api/user/preferences', { languages: selectedLanguages });
  };

  return (
    <form onSubmit={handleSubmit}>
      {languages.map(lang => (
        <div key={lang.code}>
          <input type="checkbox" onChange={() => setSelectedLanguages([...selectedLanguages, lang])} />
          {lang.nativeName}
        </div>
      ))}
      <button type="submit">Save Preferences</button>
    </form>
  );
};

export default UserPreferences;
