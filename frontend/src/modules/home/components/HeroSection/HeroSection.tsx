import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes/pathes";
import heroImage from "../../../../assets/socrates.jpg";
import "./HeroSection.scss";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box className="hero-section">
      <img
        className="hero-section__bg"
        src={heroImage}
        alt=""
        fetchPriority="high"
        loading="eager"
      />
      <div className="hero-section__overlay" aria-hidden="true" />
      <Container maxWidth="lg">
        <Box className="hero-section__content">
          <Typography variant="h1" className="hero-section__tagline">
            {t("hero_tagline", { ns: "home" })}
          </Typography>

          <Typography
            component="blockquote"
            variant="h5"
            className="hero-section__quote"
          >
            {t("hero_quote", { ns: "home" })}
          </Typography>

          <Typography variant="subtitle1" className="hero-section__author">
            {t("hero_quote_author", { ns: "home" })}
          </Typography>

          <Box className="hero-section__actions">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(ROUTES.PHILOSOPHERS)}
              className="hero-section__button hero-section__button--light"
            >
              {t("explore", { ns: "home" })}
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(ROUTES.ARTICLS)}
              className="hero-section__button hero-section__button--light"
            >
              {t("explore_articles", { ns: "home" })}
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(ROUTES.BOOKS)}
              className="hero-section__button hero-section__button--primary"
            >
              {t("explore_books", { ns: "home" })}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
