import React from 'react';
import { Grid, Button, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { SignupFormProps } from '../types/signupTypes';

export const SignupForm: React.FC<SignupFormProps> = ({
  onSubmit,
  isLoading,
  children,
}) => {
  const { t } = useTranslation('auth');

  return (
    <Paper className="signup" sx={{ p: 3, mx: 'auto', backgroundColor: "#afada9" }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        align="center" 
        sx={{ marginBottom: "5rem" }}
      >
        {t('signup.title')}
      </Typography>

      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {children}

          {/* Submit Button */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ m: "auto" }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {t('signup.submitButton')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
