import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PhilosopherCard } from "../../../philosophers/components/philosopherCard/PhilosopherCard";
import { useFeaturedPhilosophers } from "../../../philosophers/hooks";
import { ROUTES } from "../../../../routes/pathes";
import "./FeaturedPhilosophers.scss";

const FeaturedPhilosophers: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: philosophers = [] } = useFeaturedPhilosophers(3);

  return (
    <Box className="featured-philosophers">
      <Container maxWidth="lg">
        <Box className="featured-philosophers__header">
          <Typography variant="h3" className="featured-philosophers__title">
            {t("featured_title", { ns: "home" })}
          </Typography>
          <Typography variant="h6" className="featured-philosophers__subtitle">
            {t("featured_subtitle", { ns: "home" })}
          </Typography>
        </Box>

        <Grid container spacing={3} className="featured-philosophers__grid">
          {philosophers.map((philosopher) => (
            <Grid size={{ xs: 12, md: 4 }} key={philosopher.id}>
              <PhilosopherCard philosopher={philosopher} />
            </Grid>
          ))}
        </Grid>

        <Box className="featured-philosophers__action">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(ROUTES.PHILOSOPHERS)}
            className="featured-philosophers__view-all-btn"
          >
            {t("view_all", { ns: "home" })}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedPhilosophers;
