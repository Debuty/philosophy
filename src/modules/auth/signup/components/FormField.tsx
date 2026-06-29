import React from 'react';
import { Grid, TextField, InputLabel } from '@mui/material';
import type { FormFieldProps } from '../types/signupTypes';

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  error,
  register,
}) => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <TextField
        id={name}
        type={type}
        {...register(name)}
        error={!!error}
        helperText={error}
        variant="outlined"
        fullWidth
      />
    </Grid>
  );
};
