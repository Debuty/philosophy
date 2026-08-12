import React, { useState } from "react";
import { Paper, Typography, Divider } from "@mui/material";
import { CommentForm } from "./CommentForm";
import { CommentsList } from "./CommentsList";
import type { CommentsSectionProps } from "../../types/articleDetails";

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  articleId,
  comments,
  onAddComment,
  user,
  lang,
}) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      await onAddComment(newComment, user.id);
      setNewComment("");
    } catch {
      // Error is already handled in the hook
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{ p: 4, mt: 3, backgroundColor: "rgb(174 171 165) !important" }}
    >
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        {lang === "ar" ? "التعليقات" : "Comments"} ({comments?.length})
      </Typography>

      <CommentForm
        onSubmit={handleSubmit}
        value={newComment}
        onChange={setNewComment}
        user={user}
        lang={lang}
      />

      <Divider sx={{ mb: 3 }} />

      <CommentsList
        articleId={articleId}
        comments={comments}
        onAddComment={onAddComment}
        user={user}
        lang={lang}
      />
    </Paper>
  );
};
