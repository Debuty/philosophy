import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import type { ErrorStateProps } from '../../types/articleDetails';

export const ErrorState: React.FC<ErrorStateProps> = ({ onRetry, lang = 'en' }) => {
  return (
    <div className="article-details">
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          {lang === "ar" ? "خطأ في تحميل المقال" : "Error loading article"}
        </Typography>
        <Button
          variant="contained"
          onClick={onRetry}
          sx={{ mt: 2 }}
        >
          {lang === "ar" ? "العودة للمقالات" : "Back to Articles"}
        </Button>
      </Paper>
    </div>
  );
};
