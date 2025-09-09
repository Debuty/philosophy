import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import { supabase } from '../../../supabaseClient';
import {
  TextField,
  Button,
  Typography,
  InputLabel,
  Paper,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { ROUTES } from '../../../routes/pathes';
import './reset-password.scss';
import { useMutation } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';

// Zod validation schema
const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('auth');
  const [isValidSession, setIsValidSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Check if the user has a valid session for password reset
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error checking session:', error);
          toast.error(t('resetPassword.invalidLink'));
          navigate(ROUTES.LOGIN);
          return;
        }
        
        if (!session) {
          toast.error(t('resetPassword.sessionError'));
          navigate(ROUTES.LOGIN);
          return;
        }
        
        setIsValidSession(true);
      } catch (error) {
        console.error('Error checking session:', error);
        toast.error(t('resetPassword.verificationError'));
        navigate(ROUTES.LOGIN);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  const handlePasswordReset = async (data: ResetPasswordFormData) => {
    const { error } = await supabase.auth.updateUser({
      password: data.password
    });
    
    if (error) {
      throw error;
    }
  };

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: handlePasswordReset,
    onSuccess: () => {
      toast.success(t('resetPassword.successMessage'));
      navigate(ROUTES.LOGIN);
    },
    onError: (error) => {
      console.error('Error updating password:', error.message);
      toast.error(t('resetPassword.errorMessage'));
    },
  });

  const onSubmit = async (dataForm: ResetPasswordFormData) => {
    resetPassword(dataForm);
  };

  if (isLoading) {
    return (
      <Paper className="reset-password" sx={{ p: 3, maxWidth: 600, mx: 'auto', backgroundColor: "#afada9" }}>
        <Typography variant="h6" align="center">
          {t('resetPassword.verifyingLink')}
        </Typography>
      </Paper>
    );
  }

  if (!isValidSession) {
    return (
      <Paper className="reset-password" sx={{ p: 3, maxWidth: 600, mx: 'auto', backgroundColor: "#afada9" }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {t('resetPassword.invalidLink')}
        </Alert>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate(ROUTES.LOGIN)}
        >
          {t('resetPassword.backToLogin')}
        </Button>
      </Paper>
    );
  }

  return (
    <Paper className="reset-password" sx={{ p: 3, maxWidth: 600, mx: 'auto', backgroundColor: "#afada9" }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {t('resetPassword.title')}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        {t('resetPassword.infoMessage')}
      </Alert>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* New Password Field */}
          <Grid size={{ xs: 12, md: 12 }}>
            <InputLabel htmlFor="password">{t('resetPassword.newPassword')}</InputLabel>
            <TextField
              id="password"
              type="password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Confirm Password Field */}
          <Grid size={{ xs: 12, md: 12 }}>
            <InputLabel htmlFor="confirmPassword">{t('resetPassword.confirmPassword')}</InputLabel>
            <TextField
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Submit Button */}
          <Grid size={{ xs: 12, md: 12 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
              disabled={isPending}
            >
              {isPending ? t('resetPassword.updatingButton') : t('resetPassword.submitButton')}
            </Button>
          </Grid>

          {/* Back to Login Button */}
          <Grid size={{ xs: 12, md: 12 }}>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => navigate(ROUTES.LOGIN)}
              sx={{
                '&.MuiButton-root': {
                  backgroundColor: "#989590 !important",
                  color: "#534e46 !important",
                  fontSize: "1.2rem !important",
                  border: "1px solid #534e46 !important",
                }
              }}
            >
              {t('resetPassword.backToLogin')}
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Paper>
  );
};

export default ResetPassword;
