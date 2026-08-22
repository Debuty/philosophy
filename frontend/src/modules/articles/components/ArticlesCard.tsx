import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./ArticlesCard.scss";
import type { RootState } from "../../../store";
import { debugLog } from "../../../utils/debug";

interface ArticleData {
  title: string;
  subtitle: string;
  content?: string;
  category: string;
  state?: string;
  created_at: string;
  id: string;
  author_id: string;
}

interface AuthorInfo {
  username?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
}

interface ReactionCounts {
  likes?: number | null;
  dislikes?: number | null;
}

interface ArticlesCardProps {
  article: ArticleData;
  author?: AuthorInfo | null;
  reactionCounts?: ReactionCounts | null;
}

const ArticlesCard: React.FC<ArticlesCardProps> = ({
  article,
  author,
  reactionCounts,
}) => {
  const lang = useSelector((state: RootState) => state.locale.lang);
  const navigate = useNavigate();

  debugLog(author);

  return (
    <div
      className={`articles-card ${lang === "ar" ? "articles-card--rtl" : ""}`}
    >
      <Paper className="articles-card-paper">
        <Grid container className="articles-card-grid" spacing={2}>
          <Grid
            size={{ xs: 12, md: 9 }}
            className="articles-card-grid-item article-info"
          >
            <Typography className="articles-card-title">
              {article.title}
            </Typography>
            <Typography
              className="articles-card-description"
              sx={{ color: "#777065 !important" }}
            >
              {article.subtitle}
            </Typography>

            <Button
              onClick={() =>
                navigate(`/articles/${article.id}`, { state: { article } })
              }
              className="articles-card-button"
            >
              {lang === "ar" ? "اقرأ المزيد" : "Read More"}
            </Button>
          </Grid>

          <Grid
            size={{ xs: 12, md: 3 }}
            className="articles-card-grid-item author-info"
          >
            <Box className="articles-card-box">
              <div className="articles-card-avatar-container">
                <Avatar
                  className="articles-card-avatar"
                  src={author?.avatar_url ?? undefined}
                  alt={author?.username ?? undefined}
                  imgProps={{ loading: "lazy" }}
                >
                  {!author?.avatar_url &&
                    author?.username?.charAt(0).toUpperCase()}
                </Avatar>
              </div>
              <div className="articles-card-avatar-info-container">
                <Typography className="articles-card-avatar-name">
                  {author?.username}
                </Typography>
                <Typography className="articles-card-avatar-field">
                  {author?.bio}
                </Typography>
              </div>
            </Box>

            <Typography className="articles-card-time">
              published at :{" "}
              {article.created_at
                ? new Date(article.created_at).toLocaleDateString()
                : "Wrong Date"}
            </Typography>

            <Typography className="articles-card-category">
              {lang === "ar" ? "الفئة" : "Category"} : {article.category}
            </Typography>

            <Box className="articles-card-button-container">
              <div className="articles-card-button-like">
                <ThumbUpIcon className="articles-card-reaction-icon" />
                {reactionCounts?.likes ?? 0}
              </div>
              <div className="articles-card-button-dislike">
                <ThumbDownIcon className="articles-card-reaction-icon" />
                {reactionCounts?.dislikes ?? 0}
              </div>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ArticlesCard;
