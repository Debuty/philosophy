import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/pathes';
import { useTranslation } from 'react-i18next';
import './Home.scss';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box className="home">
      <Container maxWidth="lg">
        <Box className="home__hero">
          <Typography variant="h1" className="home__title">
            {t("welcome", { ns: "home" })}
          </Typography>
          <Typography variant="h5" className="home__subtitle">
            {t("subtitle", { ns: "home" })}
          </Typography>
          <Box className="home__actions">
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate(ROUTES.PHILOSOPHERS)}
              className="home__button"
            >
              {t("explore", { ns: "home" })}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
