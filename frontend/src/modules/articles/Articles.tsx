import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ArticlesCard from "./components/ArticlesCard";
import { useAuthUser } from "../auth/hooks";
import { useArticlesList } from "./hooks/useArticles";
import { useArticleData } from "./hooks/useArticleData";
import "./Articles.scss";
import { ROUTES } from "../../routes/pathes";
import Loading from "../../shared/loading/Loading";
import { EmptyState } from "../../shared/components/EmptyState/EmptyState";

const Articles: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthUser();
  const { data, isLoading } = useArticlesList({ page: 1, pageSize: 50 });
  const processedArticles = useArticleData(data?.data);

  return (
    <div className="articles">
      {user && (
        <Button
          variant="contained"
          className="articles-button"
          onClick={() => navigate(ROUTES.ADD_ARTICLE)}
        >
          {t("add_article", { ns: "articles" })}
        </Button>
      )}

      {isLoading ? (
        <Loading />
      ) : processedArticles.length > 0 ? (
        processedArticles.map(({ article, author, reactionCounts }) => (
          <ArticlesCard
            key={article.id}
            article={article}
            author={author}
            reactionCounts={reactionCounts}
          />
        ))
      ) : (
        <EmptyState DataName={"Articles"} />
      )}
    </div>
  );
};

export default Articles;
