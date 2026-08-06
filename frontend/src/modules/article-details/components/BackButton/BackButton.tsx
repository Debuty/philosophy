import React from 'react';
import { Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import type { BackButtonProps } from '../../types/articleDetails';

export const BackButton: React.FC<BackButtonProps> = ({ onClick, lang }) => {
  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={onClick}
      sx={{ mb: 3, direction: "ltr" }}
    >
      {lang === "ar" ? "العودة للمقالات" : "Back to Articles"}
    </Button>
  );
};
