import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRelatedArticles } from "../../hooks/useRelatedArticles";
import Loading from "../../../../shared/loading/Loading";

type RelatedArticlesProps = {
  articleId: string;
};

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  articleId,
}) => {
  const { t } = useTranslation("articles");
  const navigate = useNavigate();
  const { data: related = [], isLoading } = useRelatedArticles(articleId, 3);

  return (
    <Paper
      elevation={2}
      sx={{ p: 3, mt: 3, backgroundColor: "rgb(174 171 165) !important" }}
    >
      <Typography variant="h6" gutterBottom>
        {t("related.title")}
      </Typography>

      {isLoading ? (
        <Loading message={t("related.loading")} />
      ) : related.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          {t("related.empty")}
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {related.map((item) => (
            <Box key={item.id}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {item.subtitle}
              </Typography>
              <Button
                size="small"
                onClick={() => navigate(`/articles/${item.id}`)}
              >
                {t("read_more")}
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
};
