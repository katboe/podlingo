import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { SelectField } from '../common/SelectField';

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
      <SelectField
        label="Language"
        value={selectedLanguage}
        onChange={onLanguageChange}
        options={availableLanguages.map(lang => ({
          value: lang.code,
          label: lang.name
        }))}
        disabled={disabled}
      />
      
      <SelectField
        label="Level"
        value={selectedLevel}
        onChange={onLevelChange}
        options={availableLevels.map(level => ({
          value: level.level,
          label: level.level
        }))}
        disabled={disabled}
      />
      
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