import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useTranslation } from 'react-i18next';
// @ts-ignore
import { supabase } from '../../../supabaseClient';
import {

  Grid,
  TextField,
  Button,
  Typography,
  InputLabel,
  Paper,

} from '@mui/material';

import './signup.scss'; 

// Zod validation schema
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type SignupFormData = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {

  const { t } = useTranslation('auth');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
      phone: '',
    },
  });

  const onSubmit = async (dataForm: SignupFormData) => {
    console.log('Signup data:', dataForm);
    const { data, error } = await supabase.auth.signUp(dataForm)

    if (error) {
      console.error('Error signing up:', error.message)
    } else {
    console.log(data);
    }
    // await supabase.from("profiles").insert({
    //   username: dataForm.username,
    //   bio: "Loves philosophy",
    //   phone: dataForm.phone,
    // });
    // }
  };

  return (
    <Paper className="signup" sx={{ p: 3, mx: 'auto', backgroundColor: "#afada9" }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ marginBottom: "5rem" }}>
        {t('signup.title')}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Email Field */}
          <Grid size={{ xs: 12, md: 6 }} >
            <InputLabel htmlFor="email">{t('signup.email')}</InputLabel>
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
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel htmlFor="password">{t('signup.password')}</InputLabel>
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

          {/* Username Field */}
          <Grid size={{ xs: 12, md: 6 }} >
            <InputLabel htmlFor="username">{t('signup.username')}</InputLabel>
            <TextField
              id="username"
              type="text"
              {...register('username')}
              error={!!errors.username}
              helperText={errors.username?.message}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Phone Field */}
          <Grid size={{ xs: 12, md: 6 }} >
            <InputLabel htmlFor="phone">{t('signup.phone')}</InputLabel>
            <TextField
              id="phone"
              type="tel"
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              variant="outlined"
              fullWidth

            />
          </Grid>

          {/* Submit Button */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ m: "auto" }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
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

export default Signup;