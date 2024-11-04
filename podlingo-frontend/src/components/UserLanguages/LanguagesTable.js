import React from 'react';
import { Button,   TableCell,
  TableRow, } from '@mui/material';
import DataTable from '../common/DataTable';
import { SelectField } from '../common/SelectField';

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
  disabled,
  loading
}) => {
  const columns = [
    { id: 'language', label: 'Language' },
    { id: 'level', label: 'Level' },
    { id: 'actions', label: 'Actions', align: 'right' }
  ];

  const renderRow = (lang) => (
    <TableRow key={lang.code}>
      <TableCell>
        {availableLanguages.find((l) => l.code === lang.code)?.name || lang.code}
      </TableCell>
      <TableCell>
        {editMode[lang.code] ? (
          <SelectField
            value={newLevel}
            onChange={onNewLevelChange}
            options={availableLevels.map(level => ({
              value: level.level,
              label: level.level
            }))}
            disabled={disabled}
          />
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
  );

  return (
    <DataTable
      title="Current Languages"
      columns={columns}
      data={userLanguages}
      loading={loading}
      renderRow={renderRow}
      emptyMessage="No languages found."
    />
  );
}; 