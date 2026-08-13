import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../store";
import { ROUTES } from "../../routes/pathes";
import { Box, Button, Grid, Paper, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../../shared/loading/Loading";
import "./ArticleDetails.scss";
import { toast } from "react-toastify";
import { useAuthUser } from "../auth/hooks";

import {
  useArticleDetails,
  useArticleReactions,
  useComments,
  useArticleAuthor,
  useArticleBookmark,
} from "./hooks";

import {
  BackButton,
  ArticleHeader,
  ArticleContent,
  ArticleActions,
  CommentsSection,
  AuthorSidebar,
  ErrorState,
  RelatedArticles,
  EditArticleModal,
} from "./components";

const ArticleDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation("articles");
  const lang = useSelector((state: RootState) => state.locale.lang);
  const { user } = useAuthUser();
  const articleId = id || "";
  const [editOpen, setEditOpen] = useState(false);

  const { article, isLoading, error, detectedLanguage } =
    useArticleDetails(articleId);
  const { counts, myReaction, handleReaction } = useArticleReactions(
    articleId,
    user?.id || null,
  );
  const { comments, addComment } = useComments(articleId);
  const { authorProfile } = useArticleAuthor(article);
  const { isBookmarked, handleBookmark } = useArticleBookmark(
    articleId,
    user?.id || null,
    article?.is_bookmarked ?? false,
  );

  const isAuthor = Boolean(user?.id && article?.author_id === user.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      void navigator.share({
        title: article?.title,
        text: article?.subtitle,
        url: window.location.href,
      });
    } else {
      void navigator.clipboard.writeText(window.location.href);
      toast.success("Copied to clipboard");
    }
  };

  if (isLoading) return <Loading message="Loading article..." />;
  if (error || !article)
    return <ErrorState onRetry={() => navigate(ROUTES.ARTICLS)} lang={lang} />;

  return (
    <div className="article-details">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <BackButton onClick={() => navigate(ROUTES.ARTICLS)} lang={lang} />
        {isAuthor && (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setEditOpen(true)}
            sx={{
              backgroundColor: "#534e46",
              "&:hover": { backgroundColor: "#2c2820" },
            }}
          >
            {t("edit_article")}
          </Button>
        )}
      </Box>

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
              myReaction={myReaction}
            />
          </Paper>

          <CommentsSection
            articleId={articleId}
            articleAuthorId={article.author_id}
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
          <RelatedArticles articleId={articleId} />
        </Grid>
      </Grid>

      {isAuthor && (
        <EditArticleModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          article={article}
        />
      )}
    </div>
  );
};

export default ArticleDetails;
