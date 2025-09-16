import React, { useState } from 'react';
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
  Modal,
  Box,

} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import './signup.scss'; 
import { ROUTES } from '../../../routes/pathes';
import { useNavigate } from 'react-router-dom';
import { debugLog } from '../../../utils/debug';

// Zod validation schema
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type SignupFormData = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const navigate = useNavigate();
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
    debugLog('Signup data:', dataForm);
    const { data, error } = await supabase.auth.signUp({...dataForm, options: {
      data: {
        username: dataForm.username,
        phone: dataForm.phone,
      }
    }})

    if (error) {
      console.error('Error signing up:', error.message)
    } else {
      debugLog(data);
      if (data.user?.identities?.length === 0) {
        debugLog('User already exists');
        setOpenErrorModal(true);
      }
      else {
        setOpenModal(true);
      }
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

      {/* Email Confirmation Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="email-confirmation-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <CheckCircleIcon sx={{ fontSize: '3rem', color: 'green', mr: 1 }} />
            <Typography id="email-confirmation-modal" variant="h6" component="h2" sx={{fontSize: "2rem"}}>
              {t('signup.successModal.title')}
            </Typography>
          </Box>
          <Typography sx={{ mt: 2, mb: 3 ,fontSize: "1.5rem" }} >
            {t('signup.successModal.message')}
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenModal(false)}
            sx={{ mt: 2 }}
          >
            {t('signup.successModal.okButton')}
          </Button>
        </Box>
      </Modal>

      {/* Email Already Exists Modal */}
      <Modal
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
        aria-labelledby="email-exists-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <ErrorIcon sx={{ fontSize: '3rem', color: 'red', mr: 1 }} />
            <Typography id="email-exists-modal" variant="h6" component="h2" sx={{fontSize: "2rem"}}>
              {t('signup.errorModal.title')}
            </Typography>
          </Box>
          <Typography sx={{ mt: 2, mb: 3 ,fontSize: "1.5rem" }} >
            {t('signup.errorModal.message')}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, gap: 10 }}>
            <Button
              variant="contained"
              onClick={() => setOpenErrorModal(false)}
              sx={{ mt: 2 }}
            >
              {t('signup.errorModal.okButton')}
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate(ROUTES.LOGIN)}
              sx={{ mt: 2 }}
            >
              {t('signup.errorModal.loginButton')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
};

export default Signup;