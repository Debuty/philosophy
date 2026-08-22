import React from "react";
import { Avatar, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { ArticleListItem } from "../../../articles/types";
import "./LatestArticleCard.scss";

type LatestArticleCardProps = {
  article: ArticleListItem;
};

const LatestArticleCard: React.FC<LatestArticleCardProps> = ({ article }) => {
  const navigate = useNavigate();
  const author = article.profiles;

  const handleClick = () => {
    navigate(`/articles/${article.id}`, { state: { article } });
  };

  return (
    <Paper
      className="latest-article-card"
      elevation={0}
      onClick={handleClick}
      role="link"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleClick();
        }
      }}
    >
      <Typography component="h3" className="latest-article-card__title">
        {article.title}
      </Typography>

      <Typography className="latest-article-card__description">
        {article.subtitle}
      </Typography>

      <div className="latest-article-card__author">
        <Avatar
          className="latest-article-card__avatar"
          src={author?.avatar_url ?? undefined}
          alt={author?.username ?? undefined}
          imgProps={{ loading: "lazy" }}
        >
          {!author?.avatar_url && author?.username?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography className="latest-article-card__author-name">
          {author?.username}
        </Typography>
      </div>
    </Paper>
  );
};

export default LatestArticleCard;
