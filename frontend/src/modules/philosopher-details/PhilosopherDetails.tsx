import React, { useEffect } from "react";
import "./PhilosopherDetails.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { ROUTES } from "../../routes/pathes";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Loading from "../../shared/loading/Loading";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { usePhilosopherBio } from "../philosophers/hooks";
import type { PhilosopherBio, PhilosopherCard } from "../philosophers/types";

type BioSection = {
  id: string;
  titleKey: string;
  enKey: keyof PhilosopherBio;
  arKey: keyof PhilosopherBio;
};

const BIO_SECTIONS: BioSection[] = [
  {
    id: "intro",
    titleKey: "PhilosopherDetails.sections.intro",
    enKey: "intro_en",
    arKey: "intro_ar",
  },
  {
    id: "early-life",
    titleKey: "PhilosopherDetails.sections.earlyLife",
    enKey: "early_life_en",
    arKey: "early_life_ar",
  },
  {
    id: "education",
    titleKey: "PhilosopherDetails.sections.education",
    enKey: "education_en",
    arKey: "education_ar",
  },
  {
    id: "books",
    titleKey: "PhilosopherDetails.sections.books",
    enKey: "books_en",
    arKey: "books_ar",
  },
  {
    id: "school",
    titleKey: "PhilosopherDetails.sections.school",
    enKey: "school_en",
    arKey: "school_ar",
  },
  {
    id: "metaphysics",
    titleKey: "PhilosopherDetails.sections.metaphysics",
    enKey: "metaphysics_en",
    arKey: "metaphysics_ar",
  },
  {
    id: "epistemology",
    titleKey: "PhilosopherDetails.sections.epistemology",
    enKey: "epistemology_en",
    arKey: "epistemology_ar",
  },
  {
    id: "ethics",
    titleKey: "PhilosopherDetails.sections.ethics",
    enKey: "ethics_en",
    arKey: "ethics_ar",
  },
  {
    id: "politics",
    titleKey: "PhilosopherDetails.sections.politics",
    enKey: "politics_en",
    arKey: "politics_ar",
  },
  {
    id: "influence-legacy",
    titleKey: "PhilosopherDetails.sections.influenceLegacy",
    enKey: "influence_legacy_en",
    arKey: "influence_legacy_ar",
  },
  {
    id: "personal-life",
    titleKey: "PhilosopherDetails.sections.personalLife",
    enKey: "personal_life_en",
    arKey: "personal_life_ar",
  },
  {
    id: "death",
    titleKey: "PhilosopherDetails.sections.death",
    enKey: "death_en",
    arKey: "death_ar",
  },
  {
    id: "further-reading",
    titleKey: "PhilosopherDetails.sections.furtherReading",
    enKey: "further_reading_en",
    arKey: "further_reading_ar",
  },
  {
    id: "references",
    titleKey: "PhilosopherDetails.sections.references",
    enKey: "references_en",
    arKey: "references_ar",
  },
];

const PhilosopherDetails: React.FC = () => {
  const { t } = useTranslation("philosophers");
  const philosopher = useLocation().state?.philosopher as
    | PhilosopherCard
    | undefined;
  const navigate = useNavigate();
  const { id } = useParams();
  const lang = useSelector((state: RootState) => state.locale.lang);
  const philosopherId = id ? Number(id) : null;

  const {
    data: philosopherBio,
    isLoading,
    error,
  } = usePhilosopherBio(
    philosopherId != null && !Number.isNaN(philosopherId)
      ? philosopherId
      : null,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="philosopher-details">
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: "1rem" }}
        onClick={() => navigate(ROUTES.PHILOSOPHERS)}
        startIcon={<KeyboardReturnIcon />}
      >
        {t("PhilosopherDetails.backToList")}
      </Button>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 9 }}>
          <Paper
            sx={{
              padding: "4rem",
              backgroundColor: "rgb(174 171 165) !important",
            }}
          >
            <div className="philosopher-details-info-container">
              <Avatar
                src={philosopher?.image ?? undefined}
                sx={{ marginBottom: "1rem", width: "140px", height: "200px" }}
              />
              <h1>
                {lang === "ar"
                  ? philosopherBio?.name_ar
                  : philosopherBio?.name_en}
              </h1>

              {isLoading ? (
                <Loading message={t("PhilosopherDetails.loadingBio")} />
              ) : error ? (
                <div>
                  {t("PhilosopherDetails.errorLoading")}: {error.message}
                </div>
              ) : (
                philosopherBio && (
                  <div className="philosopher-bio-sections">
                    {BIO_SECTIONS.map((section) => (
                      <Accordion key={section.id}>
                        <AccordionSummary
                          expandIcon={<ArrowDownwardIcon />}
                          aria-controls={`${section.id}-content`}
                          id={`${section.id}-header`}
                        >
                          <Typography
                            className="philosopher-bio-sections-title"
                            component="span"
                          >
                            {t(section.titleKey)}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography className="philosopher-bio-sections-text">
                            {lang === "ar"
                              ? philosopherBio[section.arKey]
                              : philosopherBio[section.enKey]}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </div>
                )
              )}
            </div>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Paper
            sx={{
              padding: "1rem",
              backgroundColor: "rgb(174 171 165) !important",
            }}
          >
            <h1>{t("PhilosopherDetails.quickFacts")}</h1>
            <p className="quick-facts-item">
              {t("PhilosopherDetails.born")} : {philosopherBio?.birth}
            </p>
            <p className="quick-facts-item">
              {t("PhilosopherDetails.death")} : {philosopherBio?.death}
            </p>
            <p className="quick-facts-item">
              {t("PhilosopherDetails.nationality")} :{" "}
              {lang === "ar"
                ? philosopherBio?.nationality_ar
                : philosopherBio?.nationality_en}
            </p>
            <p className="quick-facts-item">
              {t("PhilosopherDetails.era")} :{" "}
              {lang === "ar" ? philosopherBio?.era_ar : philosopherBio?.era_en}
            </p>
            <p className="quick-facts-item">
              {t("PhilosopherDetails.school")} :{" "}
              {lang === "ar"
                ? philosopherBio?.school_ar
                : philosopherBio?.school_en}
            </p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PhilosopherDetails;
