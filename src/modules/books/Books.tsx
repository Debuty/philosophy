import React from 'react';
import { Grid, Typography, Box, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './Books.scss';

const Books: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="books">
      <Box className="books-header">
        <Typography variant="h2" component="h1" className="books-title">
          {t('Books.title', { defaultValue: 'Philosophy Books' })}
        </Typography>
        <Typography variant="h6" className="books-subtitle">
          {t('Books.subtitle', { defaultValue: 'Explore the greatest works of philosophical thought' })}
        </Typography>
      </Box>

      <Paper className="books-content" elevation={2}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="body1" className="books-description">
              {t('Books.description', { 
                defaultValue: 'Discover influential philosophical texts that have shaped human thought throughout history. From ancient wisdom to modern insights, explore the works that continue to inspire and challenge our understanding of the world.' 
              })}
            </Typography>
          </Grid>
          
          {/* Books grid will be added here */}
          <Grid container spacing={3} className="books-grid">
            <Grid size={{ xs: 12 }}>
              <Typography variant="h5" className="coming-soon">
                {t('Books.comingSoon', { defaultValue: 'Coming Soon - Book Collection' })}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Books;
