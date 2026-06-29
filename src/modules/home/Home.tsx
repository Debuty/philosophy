import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/pathes';
import { useTranslation } from 'react-i18next';
import FeaturesSection from './components/FeaturesSection/FeaturesSection';
import FeaturedPhilosophers from './components/FeaturedPhilosophers/FeaturedPhilosophers';
import CallToAction from './components/CallToAction/CallToAction';
import './Home.scss';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box className="home">
      Hero Section
      <Box className="home__hero">
        <Container maxWidth="lg">
          <Box className="home__hero-content">
            <Typography variant="h1" className="home__title">
              {t('welcome', { ns: 'home' })}
            </Typography>
            <Typography variant="h5" className="home__subtitle">
              {t('subtitle', { ns: 'home' })}
            </Typography>
            <Typography variant="body1" className="home__description">
              {t('hero_description', { ns: 'home' })}
            </Typography>
            <Box className="home__actions">
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate(ROUTES.PHILOSOPHERS)}
                className="home__button home__button--primary"
              >
                {t('explore', { ns: 'home' })}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate(ROUTES.ARTICLS)}
                className="home__button home__button--secondary"
              >
                {t('explore_articles', { ns: 'home' })}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <FeaturesSection />

      {/* Featured Philosophers Section */}
      <FeaturedPhilosophers />

      {/* Call to Action Section */}
      <CallToAction />
    </Box>
  );
};

export default Home;
