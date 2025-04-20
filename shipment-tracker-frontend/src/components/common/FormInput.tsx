import React from 'react';
import { TextField } from '@mui/material';
import { FormInputProps } from '../../types';

const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  value, 
  onChange, 
  required = false, 
  type = 'text',
  error,
  placeholder
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      type={type}
      error={!!error}
      helperText={error}
      placeholder={placeholder}
      variant="outlined"
      margin="normal"
      sx={{ mb: 2 }}
    />
  );
};

export default FormInput;
