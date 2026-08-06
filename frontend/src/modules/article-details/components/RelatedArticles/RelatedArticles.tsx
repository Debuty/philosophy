import React from 'react';
import { Paper, Typography } from '@mui/material';

export const RelatedArticles: React.FC = () => {
  return (
    <Paper elevation={2} sx={{ p: 3, mt: 3, backgroundColor: "rgb(174 171 165) !important" }}>
      <Typography variant="h6" gutterBottom>
        Related Articles
      </Typography>
      <Typography variant="body2" color="text.secondary">
        More articles coming soon...
      </Typography>
    </Paper>
  );
};
