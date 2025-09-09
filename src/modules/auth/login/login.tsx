import React from 'react';
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
  Link,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { ROUTES } from '../../../routes/pathes';
import './login.scss';
import { useMutation } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('auth');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handelsignIn = async (data: LoginFormData) => {
  console.log("handelsignIn");
    const { data: dataSignIn, error } = await supabase.auth.signInWithPassword(data);
    if (error) {
      throw error;
    }
    else {
      return dataSignIn;
    }
  }

  const handleForgotPassword = async (email: string) => {
    console.log("handleForgotPassword");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      throw error;
    }
  }

  console.log(window.location.origin);
  const { mutate, isPending} = useMutation({
    mutationFn: handelsignIn,
    onSuccess: (data) => {
      console.log(data);
      navigate(ROUTES.PROFILE);
      toast.success('Login successful');
    },
    onError: (error) => {
      console.error('Error signing in:', error.message);
      toast.error('Login failed');
    },
  });

  const { mutate: forgotPassword, isPending: isForgotPasswordPending } = useMutation({
    mutationFn: handleForgotPassword,
    onSuccess: () => {
      toast.success('Password reset email sent! Check your inbox.');
    },
    onError: (error) => {
      console.error('Error sending reset email:', error.message);
      toast.error('Failed to send reset email');
    },
  });

  const onSubmit = async (dataForm: LoginFormData) => {

    mutate(dataForm);
  };

  return (
    <Paper className="login" sx={{ p: 3, maxWidth: 600, mx: 'auto', backgroundColor: "#afada9" }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {t('login.title')}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Email Field */}
          <Grid size={{ xs: 12, md: 12 }}>
            <InputLabel htmlFor="email">{t('login.email')}</InputLabel>
            <TextField
              id="email"
              type="text"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Password Field */}
          <Grid size={{ xs: 12, md: 12 }}>
            <InputLabel htmlFor="password">{t('login.password')}</InputLabel>
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

          {/* Forgot Password Link */}
          <Grid size={{ xs: 12, md: 12 }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                const email = document.getElementById('email') as HTMLInputElement;
                if (email?.value) {
                  forgotPassword(email.value);
                } else {
                  toast.error('Please enter your email first');
                }
              }}
              disabled={isForgotPasswordPending}
              sx={{
                textAlign: 'right',
                display: 'block',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '1.4rem',
                color: '#534e46',
                '&:hover': {
                  color: '#2c2820',
                },
                '&:disabled': {
                  color: '#999',
                }
              }}
            >
              {isForgotPasswordPending ? 'Sending...' : 'Forgot Password ?'}
            </Link>
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
              {t('login.submitButton')}
            </Button>
          </Grid>

          {/* Signup Button */}
          <Grid size={{ xs: 12, md: 12 }}>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => navigate(ROUTES.SIGNUP)}
              sx={{
                '&.MuiButton-root': {
                  backgroundColor: "#989590 !important",
                  color: "#534e46 !important",
                  fontSize: "1.2rem !important",
                  border: "1px solid #534e46 !important",
                }
              }}
            >
              {t('login.signupButton')}
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

export default Login;