import React from 'react';
import {
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

export const LanguagesTable = ({ 
  userLanguages, 
  availableLanguages, 
  availableLevels,
  editMode,
  newLevel,
  onEditToggle,
  onNewLevelChange,
  onUpdate,
  onRemove,
  disabled
}) => (
  <>
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
                <TableCell>
                  {availableLanguages.find((l) => l.code === lang.code)?.name || lang.code}
                </TableCell>
                <TableCell>
                  {editMode[lang.code] ? (
                    <Select
                      value={newLevel}
                      onChange={onNewLevelChange}
                      fullWidth
                      disabled={disabled}
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
                      onClick={() => onUpdate(lang.code, newLevel)}
                      disabled={disabled}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button 
                      variant="outlined" 
                      onClick={() => onEditToggle(lang.code, lang.level)}
                      disabled={disabled}
                    >
                      Edit
                    </Button>
                  )}
                  <Button 
                    onClick={() => onRemove(lang.code)}
                    disabled={disabled}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </>
); 