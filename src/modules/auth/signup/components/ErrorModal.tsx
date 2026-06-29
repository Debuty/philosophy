import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { modalStyles } from '../constants/signupConstants';
import type { ErrorModalProps } from '../types/signupTypes';

export const ErrorModal: React.FC<ErrorModalProps> = ({
  open,
  onClose,
  onLogin,
  title,
  message,
  okButtonText,
  loginButtonText,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="email-exists-modal"
    >
      <Box sx={modalStyles}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          mb: 2 
        }}>
          <ErrorIcon sx={{ fontSize: '3rem', color: 'red', mr: 1 }} />
          <Typography 
            id="email-exists-modal" 
            variant="h6" 
            component="h2" 
            sx={{ fontSize: "2rem" }}
          >
            {title}
          </Typography>
        </Box>
        <Typography sx={{ mt: 2, mb: 3, fontSize: "1.5rem" }}>
          {message}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          mb: 2, 
          gap: 10 
        }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ mt: 2 }}
          >
            {okButtonText}
          </Button>
          <Button
            variant="contained"
            onClick={onLogin}
            sx={{ mt: 2 }}
          >
            {loginButtonText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
