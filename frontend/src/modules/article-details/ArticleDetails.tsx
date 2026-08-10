import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { ROUTES } from "../../routes/pathes";
import { Grid, Paper, Divider } from "@mui/material";
import Loading from "../../shared/loading/Loading";
import "./ArticleDetails.scss";
import { toast } from "react-toastify";
import { useAuthUser } from "../auth/hooks";

// Custom hooks
import {
  useArticleDetails,
  useArticleReactions,
  useComments,
  useArticleAuthor,
} from "./hooks";

// Components
import {
  BackButton,
  ArticleHeader,
  ArticleContent,
  ArticleActions,
  CommentsSection,
  AuthorSidebar,
  ErrorState,
  RelatedArticles,
} from "./components";

const ArticleDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lang = useSelector((state: RootState) => state.locale.lang);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user } = useAuthUser();

  // Custom hooks
  const { article, isLoading, error, detectedLanguage } = useArticleDetails(
    id || "",
  );
  const { counts, handleReaction } = useArticleReactions(
    id || "",
    user?.id || null,
  );
  const { comments, addComment } = useComments(id || "");
  const { authorProfile } = useArticleAuthor(article?.author_id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handlers
  const handleBookmark = () => setIsBookmarked((prev) => !prev);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.subtitle,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Copied to clipboard");
    }
  };

  // Loading and error states
  if (isLoading) return <Loading message="Loading article..." />;
  if (error || !article)
    return <ErrorState onRetry={() => navigate(ROUTES.ARTICLS)} lang={lang} />;

  return (
    <div className="article-details">
      <BackButton onClick={() => navigate(ROUTES.ARTICLS)} lang={lang} />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            elevation={2}
            sx={{ p: 4, backgroundColor: "rgb(174 171 165) !important" }}
          >
            <ArticleHeader
              article={article}
              detectedLanguage={detectedLanguage}
            />

            <Divider sx={{ mb: 4 }} />

            <ArticleContent
              content={article.content}
              detectedLanguage={detectedLanguage}
            />

            <Divider sx={{ mb: 4 }} />

            <ArticleActions
              counts={counts}
              onLike={() => handleReaction("like")}
              onDislike={() => handleReaction("dislike")}
              onBookmark={handleBookmark}
              onShare={handleShare}
              isBookmarked={isBookmarked}
            />
          </Paper>

          <CommentsSection
            comments={comments}
            onAddComment={addComment}
            user={user}
            lang={lang}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <AuthorSidebar
            authorProfile={authorProfile}
            article={article}
            lang={lang}
          />
          <RelatedArticles />
        </Grid>
      </Grid>
    </div>
  );
};

export default ArticleDetails;
