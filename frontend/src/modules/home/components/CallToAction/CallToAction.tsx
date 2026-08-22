import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../../auth/hooks/useAuthSession";
import { ROUTES } from "../../../../routes/pathes";
import "./CallToAction.scss";

const CallToAction: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthUser();

  const isLoggedIn = Boolean(user);

  return (
    <Box className="cta-section">
      <Container maxWidth="lg">
        <Box className="cta-section__content">
          <Typography variant="h3" className="cta-section__title">
            {isLoggedIn
              ? t("cta_welcome_title", {
                  ns: "home",
                  username: user?.username,
                })
              : t("cta_guest_title", { ns: "home" })}
          </Typography>

          <Typography variant="h6" className="cta-section__subtitle">
            {isLoggedIn
              ? t("cta_welcome_subtitle", { ns: "home" })
              : t("cta_guest_subtitle", { ns: "home" })}
          </Typography>

          <Box className="cta-section__buttons">
            {isLoggedIn ? (
              <>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate(`/profile/${user!.id}`)}
                  className="cta-section__primary-btn"
                >
                  {t("cta_my_profile", { ns: "home" })}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate(ROUTES.ARTICLS)}
                  className="cta-section__secondary-btn"
                >
                  {t("explore_articles", { ns: "home" })}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate(ROUTES.SIGNUP)}
                  className="cta-section__primary-btn"
                >
                  {t("cta_sign_up", { ns: "home" })}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate(ROUTES.LOGIN)}
                  className="cta-section__secondary-btn"
                >
                  {t("cta_log_in", { ns: "home" })}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CallToAction;
