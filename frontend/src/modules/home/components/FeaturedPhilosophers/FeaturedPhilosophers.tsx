import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import { ROUTES } from "../../../../routes/pathes";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useFeaturedPhilosophers } from "../../../philosophers/hooks";
import "./FeaturedPhilosophers.scss";

const FeaturedPhilosophers: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = useSelector((state: RootState) => state.locale.lang);
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

        <Grid container spacing={4} className="featured-philosophers__grid">
          {philosophers.map((philosopher) => (
            <Grid size={{ xs: 12, md: 4 }} key={philosopher.id}>
              <Card className="philosopher-preview-card" elevation={2}>
                <CardMedia
                  component="img"
                  image={philosopher.image ?? undefined}
                  alt={
                    lang === "ar" ? philosopher.name_ar : philosopher.name_en
                  }
                  className="philosopher-preview-card__image"
                  sx={{
                    height: "366px !important",
                    width: "278px !important",
                    margin: "1rem auto",
                    borderRadius: "1rem",
                  }}
                />
                <CardContent className="philosopher-preview-card__content">
                  <Typography
                    variant="h5"
                    className="philosopher-preview-card__name"
                  >
                    {lang === "ar"
                      ? philosopher.name_ar
                      : philosopher.name_en}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="philosopher-preview-card__dates"
                  >
                    {philosopher.birth} - {philosopher.death}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="philosopher-preview-card__description"
                  >
                    {lang === "ar"
                      ? philosopher.short_description_ar
                      : philosopher.short_description_en}
                  </Typography>
                </CardContent>
                <CardActions className="philosopher-preview-card__actions">
                  <Button
                    size="small"
                    onClick={() =>
                      navigate(`/philosophers/${philosopher.id}`, {
                        state: { philosopher },
                      })
                    }
                    className="philosopher-preview-card__button"
                    endIcon={<ArrowForwardIcon />}
                  >
                    {lang === "ar" ? "اقرأ المزيد" : "Learn More"}
                  </Button>
                </CardActions>
              </Card>
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
