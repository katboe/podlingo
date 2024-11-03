import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext'; 
import {
  Box,
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Snackbar, 
  Alert
} from '@mui/material';

const UserLanguages = () => {
  const { isAuthenticated } = useContext(UserContext);
  const [userLanguages, setUserLanguages] = useState([]); // Store language codes and levels
  const [availableLanguages, setAvailableLanguages] = useState([]); // Store language codes for selection
  const [languageMap, setLanguageMap] = useState({}); // Map of language code to language name
  const [availableLevels, setAvailableLevels] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [newLevel, setNewLevel] = useState('');
  const [editMode, setEditMode] = useState({}); // Tracks which language is in edit mode
  const [error, setError] = useState(null); // State for error message
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for snackbar visibility

  const toggleEditMode = (code, level) => {
    setEditMode((prev) => ({ ...prev, [code]: !prev[code] }));
    setNewLevel(level)
  };

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
      try { 
        // Add language to the user's languages via API
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/languages`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ languageCode: selectedLanguage, level: selectedLevel }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to add language');
        }

        // Update the local state
        const data = await response.json();
        setUserLanguages((prev) => [...prev, { code: selectedLanguage, level: selectedLevel }]);
        setSelectedLanguage('');
        setSelectedLevel('');
      } catch (error) {
        // Handle error (e.g., display error message to the user)
        console.error('Error adding language:', error.message);
        //alert(error.message); // Simple alert for demo; consider using a snackbar or modal
        setError(error.message); // Set error message
        setSnackbarOpen(true); // Open snackbar
      }
    }
  };
  
  
  const handleUpdateLanguage = async (code, newLevel) => {
    await fetch(`${process.env.REACT_APP_API_URL}/user/languages`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ languageCode: code, newLevel }),
    });

    setUserLanguages(userLanguages.map(lang =>
      lang.code === code ? { ...lang, level: newLevel } : lang
    ));
    toggleEditMode(code);
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

  // Modify how you render level options in the dropdown
  const renderLevelOptions = (newLevel) =>
    availableLevels.map((levelObj) => (
      <option key={levelObj._id} value={levelObj.level}> {/* Assuming 'level' is the field to display */}
        {levelObj.level || levelObj.description || 'Unnamed Level'}
      </option>
    ));

  return (
    <Box p={3}>
    <Typography variant="h4" gutterBottom>User Languages</Typography>

    {/* Add Language Section */}
    <Box mb={3}>
      <Typography variant="h6">Add Language</Typography>
      <Box display="flex" gap={2} mt={1}>
        <Select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>Select Language</MenuItem>
          {availableLanguages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>Select Level</MenuItem>
          {availableLevels.map((level) => (
            <MenuItem key={level.level} value={level.level}>
              {level.level}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary" onClick={handleAddLanguage}>
          Add
        </Button>
      </Box>
    </Box>

    {/* Current Languages Table */}
    <Typography variant="h6" gutterBottom>Current Languages</Typography>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Language</TableCell>
            <TableCell>Level</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userLanguages.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center">No languages found.</TableCell>
            </TableRow>
          ) : (
            userLanguages.map((lang) => (
              <TableRow key={lang.code}>
                <TableCell>{availableLanguages.find((l) => l.code === lang.code)?.name || lang.code}</TableCell>
                <TableCell>
                  {editMode[lang.code] ? (
                    <Select
                      value={newLevel}
                      onChange={(e) => setNewLevel(e.target.value)}
                      fullWidth
                    >
                      {availableLevels.map((level) => (
                        <MenuItem key={level.level} value={level.level}>
                          {level.level}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    lang.level
                  )}
                </TableCell>
                <TableCell align="right">
                  {editMode[lang.code] ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleUpdateLanguage(lang.code, newLevel)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button variant="outlined" onClick={() => toggleEditMode(lang.code, lang.level)}>
                      Edit
                    </Button>
                  )}
                  <Button  onClick={() => handleRemoveLanguage(lang.code)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <Snackbar 
      open={snackbarOpen} 
      autoHideDuration={6000} 
      onClose={() => setSnackbarOpen(false)} 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ backgroundColor: '#ffcccc', color: 'red', opacity: 0.7 }}>
        {error} {/* Display the error message */}
      </Alert>
    </Snackbar>
  </Box>
  );
};

export default UserLanguages;
