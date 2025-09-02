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
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { ROUTES } from '../../../routes/pathes';
import './login.scss';

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

  const onSubmit = async (dataForm: LoginFormData) => {
    console.log('Login data:', dataForm);
    const { data, error } = await supabase.auth.signInWithPassword(dataForm);

    if (error) {
      console.error('Error signing in:', error.message);
    } else {
      console.log('User signed in:', data);
    }
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

          {/* Submit Button */}
          <Grid size={{ xs: 12, md: 12 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
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
    </Paper>
  );
};

export default Login;