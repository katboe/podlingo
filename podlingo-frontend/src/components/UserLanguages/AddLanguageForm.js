import React from 'react';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';

export const AddLanguageForm = ({ 
  availableLanguages, 
  availableLevels, 
  selectedLanguage, 
  selectedLevel, 
  onLanguageChange, 
  onLevelChange, 
  onAdd,
  disabled 
}) => (
  <Box mb={3}>
    <Typography variant="h6">Add Language</Typography>
    <Box display="flex" gap={2} mt={1}>
      <Select
        value={selectedLanguage}
        onChange={onLanguageChange}
        displayEmpty
        fullWidth
        disabled={disabled}
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
        onChange={onLevelChange}
        displayEmpty
        fullWidth
        disabled={disabled}
      >
        <MenuItem value="" disabled>Select Level</MenuItem>
        {availableLevels.map((level) => (
          <MenuItem key={level.level} value={level.level}>
            {level.level}
          </MenuItem>
        ))}
      </Select>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={onAdd}
        disabled={disabled || !selectedLanguage || !selectedLevel}
      >
        Add
      </Button>
    </Box>
  </Box>
); 