import React from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useArticlesList } from "../../../articles/hooks/useArticles";
import { ROUTES } from "../../../../routes/pathes";
import LatestArticleCard from "./LatestArticleCard";
import "./LatestArticles.scss";

const SKELETON_COUNT = 3;

const LatestArticles: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useArticlesList({
    page: 1,
    pageSize: 3,
  });

  const articles = data?.data ?? [];

  return (
    <Box className="latest-articles">
      <Container maxWidth="lg">
        <Box className="latest-articles__header">
          <Typography variant="h3" className="latest-articles__title">
            {t("latest_articles_title", { ns: "home" })}
          </Typography>
          <Typography variant="h6" className="latest-articles__subtitle">
            {t("latest_articles_subtitle", { ns: "home" })}
          </Typography>
        </Box>

        {isLoading && (
          <Box className="latest-articles__list">
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <Paper
                key={index}
                className="latest-articles__skeleton"
                elevation={0}
              >
                <Skeleton variant="text" height={32} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} sx={{ mt: 2 }} />
                <Skeleton variant="circular" width={48} height={48} />
              </Paper>
            ))}
          </Box>
        )}

        {!isLoading && isError && (
          <Typography className="latest-articles__message" role="alert">
            {t("latest_articles_error", { ns: "home" })}
          </Typography>
        )}

        {!isLoading && !isError && articles.length === 0 && (
          <Typography className="latest-articles__message">
            {t("latest_articles_empty", { ns: "home" })}
          </Typography>
        )}

        {!isLoading && !isError && articles.length > 0 && (
          <Box className="latest-articles__list">
            {articles.map((article) => (
              <LatestArticleCard key={article.id} article={article} />
            ))}
          </Box>
        )}

        <Box className="latest-articles__action">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(ROUTES.ARTICLS)}
            className="latest-articles__view-all-btn"
          >
            {t("view_all_articles", { ns: "home" })}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LatestArticles;
