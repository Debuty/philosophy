import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import './FeaturesSection.scss';

interface Feature {
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
}

const FeaturesSection: React.FC = () => {
  const { t } = useTranslation();

  const features: Feature[] = [
    {
      icon: <ForumOutlinedIcon sx={{ fontSize: 60 }} />,
      titleKey: 'feature_1_title',
      descKey: 'feature_1_desc',
    },
    {
      icon: <GroupsOutlinedIcon sx={{ fontSize: 60 }} />,
      titleKey: 'feature_2_title',
      descKey: 'feature_2_desc',
    },
    {
      icon: <MenuBookOutlinedIcon sx={{ fontSize: 60 }} />,
      titleKey: 'feature_3_title',
      descKey: 'feature_3_desc',
    },
  ];

  return (
    <Box className="features-section">
      <Container maxWidth="lg">
        <Typography variant="h3" className="features-section__title">
          {t('features_title', { ns: 'home' })}
        </Typography>
        <Grid container spacing={4} className="features-section__grid">
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Paper className="feature-card" elevation={3}>
                <Box className="feature-card__icon">{feature.icon}</Box>
                <Typography variant="h5" className="feature-card__title">
                  {t(feature.titleKey, { ns: 'home' })}
                </Typography>
                <Typography variant="body1" className="feature-card__description">
                  {t(feature.descKey, { ns: 'home' })}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;

