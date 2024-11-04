import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export const SelectField = ({ 
  label,
  value,
  onChange,
  options,
  disabled,
  fullWidth = true,
  required = false,
}) => (
  <FormControl fullWidth={fullWidth}>
    <InputLabel>{label}</InputLabel>
    <Select
      value={value}
      onChange={onChange}
      label={label}
      disabled={disabled}
      required={required}
    >
      <MenuItem value="" disabled>
        <em>Select {label}</em>
      </MenuItem>
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
); 