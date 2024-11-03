import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Box, Typography } from '@mui/material';
import { AddLanguageForm } from './AddLanguageForm';
import { LanguagesTable } from './LanguagesTable';
import SnackbarNotification from '../../components/SnackbarNotification';
import useLanguages from '../../hooks/useLanguages';

const UserLanguages = () => {
  const { isAuthenticated } = useContext(UserContext);
  const { 
    userLanguages, 
    availableLanguages, 
    availableLevels,
    error,
    loading,
    fetchData,
    addLanguage,
    updateLanguage,
    removeLanguage
  } = useLanguages();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [editMode, setEditMode] = useState({});
  const [newLevel, setNewLevel] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }, [error]);

  const handleAddLanguage = async () => {
    if (selectedLanguage && selectedLevel) {
      const success = await addLanguage(selectedLanguage, selectedLevel);
      if (success) {
        setSelectedLanguage('');
        setSelectedLevel('');
      }
    }
  };

  const toggleEditMode = (code, level) => {
    setEditMode(prev => ({ ...prev, [code]: !prev[code] }));
    setNewLevel(level);
  };

  const handleUpdateLanguage = async (code, level) => {
    const success = await updateLanguage(code, level);
    if (success) {
      toggleEditMode(code);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>User Languages</Typography>
      
      <AddLanguageForm 
        availableLanguages={availableLanguages}
        availableLevels={availableLevels}
        selectedLanguage={selectedLanguage}
        selectedLevel={selectedLevel}
        onLanguageChange={(e) => setSelectedLanguage(e.target.value)}
        onLevelChange={(e) => setSelectedLevel(e.target.value)}
        onAdd={handleAddLanguage}
        disabled={loading}
      />
      
      <LanguagesTable 
        userLanguages={userLanguages}
        availableLanguages={availableLanguages}
        availableLevels={availableLevels}
        editMode={editMode}
        newLevel={newLevel}
        onEditToggle={toggleEditMode}
        onNewLevelChange={(e) => setNewLevel(e.target.value)}
        onUpdate={handleUpdateLanguage}
        onRemove={removeLanguage}
        disabled={loading}
      />
      
      <SnackbarNotification 
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={error || 'An error occurred'}
      />
    </Box>
  );
};

export default UserLanguages; 