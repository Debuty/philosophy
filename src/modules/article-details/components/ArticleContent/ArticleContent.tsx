import React from 'react';
import { Box, Typography } from '@mui/material';
import type { ArticleContentProps } from '../../types/articleDetails';

export const ArticleContent: React.FC<ArticleContentProps> = ({ 
  content, 
  detectedLanguage 
}) => {
  return (
    <Box className="article-content" dir={detectedLanguage === "ar" ? "rtl" : "ltr"}>
      <Typography
        variant="body1"
        sx={{
          fontSize: '1.7rem',
          textAlign: 'justify',
          whiteSpace: 'pre-wrap',
        }}
      >
        {content}
      </Typography>
    </Box>
  );
};
