import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { modalStyles } from '../constants/signupConstants';
import type { SuccessModalProps } from '../types/signupTypes';

export const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  onClose,
  title,
  message,
  okButtonText,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="email-confirmation-modal"
    >
      <Box sx={modalStyles}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          mb: 2 
        }}>
          <CheckCircleIcon sx={{ fontSize: '3rem', color: 'green', mr: 1 }} />
          <Typography 
            id="email-confirmation-modal" 
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
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ mt: 2 }}
        >
          {okButtonText}
        </Button>
      </Box>
    </Modal>
  );
};
