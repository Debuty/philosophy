import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/pathes';
import { useSignup } from './hooks/useSignup';
import { SuccessModal } from './components/SuccessModal';
import { ErrorModal } from './components/ErrorModal';
import { FormField } from './components/FormField';
import { formFields } from './constants/signupConstants';
import { Grid, Button, Paper, Typography } from '@mui/material';

const Signup: React.FC = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { form, isLoading, handleSignup, modals } = useSignup();

  const onSubmit = form.handleSubmit(handleSignup);

  const handleLoginNavigation = () => {
    modals.errorModal.close();
    navigate(ROUTES.LOGIN);
  };

  return (
    <>
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
            {formFields.map((field) => (
              <FormField
                key={field.name}
                name={field.name}
                label={t(field.label)}
                type={field.type}
                error={form.formState.errors[field.name]?.message}
                register={form.register}
              />
            ))}

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

      <SuccessModal
        open={modals.successModal.open}
        onClose={modals.successModal.close}
        title={t('signup.successModal.title')}
        message={t('signup.successModal.message')}
        okButtonText={t('signup.successModal.okButton')}
      />

      <ErrorModal
        open={modals.errorModal.open}
        onClose={modals.errorModal.close}
        onLogin={handleLoginNavigation}
        title={t('signup.errorModal.title')}
        message={t('signup.errorModal.message')}
        okButtonText={t('signup.errorModal.okButton')}
        loginButtonText={t('signup.errorModal.loginButton')}
      />
    </>
  );
};

export default Signup;