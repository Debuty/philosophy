import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import type { ArticleHeaderProps } from '../../types/articleDetails';

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ 
  article, 
  detectedLanguage 
}) => {
  return (
    <Box sx={{ mb: 4 }} dir={detectedLanguage === "ar" ? "rtl" : "ltr"}>
      <Chip
        label={article?.category}
        sx={{ mb: 2, fontSize: '1.1rem' }}
      />
      <Typography variant="h3" component="h1" gutterBottom>
        {article?.title}
      </Typography>
      <Typography variant="h5" color="text.secondary" sx={{ mb: 3, fontSize: '1.7rem' }}>
        {article?.subtitle}
      </Typography>

      {/* Article Meta */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.3rem' }}>
          {new Date(article?.created_at).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.3rem' }}>
          • {article?.state}
        </Typography>
      </Box>
    </Box>
  );
};
