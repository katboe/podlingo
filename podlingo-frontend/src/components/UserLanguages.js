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
} from '@mui/material';
import SnackbarNotification from './SnackbarNotification'; // Import the new component


const UserLanguages = () => {
  const { isAuthenticated } = useContext(UserContext);
  const [userLanguages, setUserLanguages] = useState([]); 
  const [availableLanguages, setAvailableLanguages] = useState([]); 
  const [availableLevels, setAvailableLevels] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [newLevel, setNewLevel] = useState('');
  const [editMode, setEditMode] = useState({}); 
  const [error, setError] = useState(null); 
  const [snackbarOpen, setSnackbarOpen] = useState(false); 

  const toggleEditMode = (code, level) => {
    setEditMode((prev) => ({ ...prev, [code]: !prev[code] }));
    setNewLevel(level);
  };

  useEffect(() => {
    const fetchUserLanguages = async () => {
      if (isAuthenticated) {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/user/languages`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user languages');
          }
          
          const data = await response.json();
          setUserLanguages(data);
        } catch (error) {
          console.error('Error fetching user languages:', error);
          setError(error.message);
          setSnackbarOpen(true);
        }
      }
    };

    const fetchAvailableLanguages = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/podcasts/languages`);
        if (!response.ok) {
          throw new Error('Failed to fetch available languages');
        }
        
        const data = await response.json();
        setAvailableLanguages(data);

      } catch (error) {
        console.error('Error fetching available languages:', error);
        setError(error.message);
        setSnackbarOpen(true);
      }
    };

    const fetchAvailableLevels = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/podcasts/levels`);
        if (!response.ok) {
          throw new Error('Failed to fetch available levels');
        }
        
        const data = await response.json();
        setAvailableLevels(data);
      } catch (error) {
        console.error('Error fetching available levels:', error);
        setError(error.message);
        setSnackbarOpen(true);
      }
    };

    fetchUserLanguages();
    fetchAvailableLanguages();
    fetchAvailableLevels();
  }, [isAuthenticated]);

  const handleAddLanguage = async () => {
    if (selectedLanguage && selectedLevel) {
      try {
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

        await response.json();
        setUserLanguages((prev) => [...prev, { code: selectedLanguage, level: selectedLevel }]);
        setSelectedLanguage('');
        setSelectedLevel('');
      } catch (error) {
        console.error('Error adding language:', error);
        setError(error.message);
        setSnackbarOpen(true);
      }
    }
  };

  const handleUpdateLanguage = async (code, newLevel) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/languages`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ languageCode: code, newLevel }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update language');
      }

      setUserLanguages(userLanguages.map(lang =>
        lang.code === code ? { ...lang, level: newLevel } : lang
      ));
      toggleEditMode(code);
    } catch (error) {
      console.error('Error updating language:', error);
      setError(error.message);
      setSnackbarOpen(true);
    }
  };

  const handleRemoveLanguage = async (languageToRemove) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/languages`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ languageCode: languageToRemove }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove language');
      }

      setUserLanguages((prev) => prev.filter((lang) => lang.code !== languageToRemove));
    } catch (error) {
      console.error('Error removing language:', error);
      setError(error.message);
      setSnackbarOpen(true);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>User Languages</Typography>

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
                    <Button onClick={() => handleRemoveLanguage(lang.code)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <SnackbarNotification 
        open={snackbarOpen} 
        onClose={() => setSnackbarOpen(false)} 
        message={error || 'An error occurred'} 
      />
    </Box>
  );
};

export default UserLanguages;
