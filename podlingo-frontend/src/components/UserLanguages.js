import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext'; 
import * as jwtDecode from 'jwt-decode';

const UserLanguages = () => {
  const { isAuthenticated } = useContext(UserContext);
  const [userLanguages, setUserLanguages] = useState([]); // Store language codes and levels
  const [availableLanguages, setAvailableLanguages] = useState([]); // Store language codes for selection
  const [languageMap, setLanguageMap] = useState({}); // Map of language code to language name
  const [availableLevels, setAvailableLevels] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');


  useEffect(() => {
    // Fetch user's languages from the API
    const fetchUserLanguages = async () => {
      if (isAuthenticated) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/languages`, {
          method: 'GET',
          credentials: 'include', // Ensure cookies are sent with the request
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserLanguages(data); // Assume data is an array of { code, level }
        } else {
          const errorData = await response.json();
          console.error('Failed to fetch user languages:', response.statusText, errorData);
        }
      };
    }
    
    // Fetch available languages and their names from the API
    const fetchAvailableLanguages = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/podcasts/languages`);
      const data = await response.json();

      setAvailableLanguages(data); // Assume data is an array of language codes
      const langMap = data.reduce((acc, lang) => {
        acc[lang.code] = lang.name; // Map language code to name
        return acc;
      }, {});

      setLanguageMap(langMap);
    };

    // Fetch available levels from the API
    const fetchAvailableLevels = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/podcasts/levels`);
      const data = await response.json();

      setAvailableLevels(data);
    };

    fetchUserLanguages();
    fetchAvailableLanguages();
    fetchAvailableLevels();
  }, [isAuthenticated]);

  const handleAddLanguage = async () => {
    if (selectedLanguage && selectedLevel) {
      // Add language to the user's languages via API
      await fetch(`${process.env.REACT_APP_API_URL}/user/languages`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ languageCode: selectedLanguage, level: selectedLevel }),
      });

      // Update the local state
      setUserLanguages((prev) => [...prev, { code: selectedLanguage, level: selectedLevel }]);
      setSelectedLanguage('');
      setSelectedLevel('');
    }
  };

  const handleRemoveLanguage = async (languageToRemove) => {
    // Remove language from user's languages via API
    await fetch(`${process.env.REACT_APP_API_URL}/user/languages`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ languageCode: languageToRemove }),
    });

    // Update the local state
    setUserLanguages((prev) => prev.filter((lang) => lang.code !== languageToRemove));
  };

  return (
    <div>
      <h2>User Languages</h2>
      <div>
        <h3>Add Language</h3>
        <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value="">Select Language</option>
          {availableLanguages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
          <option value="">Select Level</option>
          {availableLevels.map((level) => (
            <option key={level.level} value={level.level}>
              {level.level}
            </option>
          ))}
        </select>
        <button onClick={handleAddLanguage}>Add</button>
      </div>
      <h3>Current Languages</h3>
      <ul>
        {userLanguages.length === 0 ? (
          <li>No languages found.</li> // Provide feedback for empty list
        ) : (
          userLanguages.map((lang) => {
            if (!lang || !lang.code || !lang.level) {
              console.error('Invalid language object:', lang);
              return null; // Skip invalid entries
            }
            return (
              <li key={lang.code}>
                {languageMap[lang.code] || lang.code} - {lang.level}
                <button onClick={() => handleRemoveLanguage(lang.code)}>Remove</button>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default UserLanguages;
