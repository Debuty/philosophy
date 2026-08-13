import React from "react";
import { List } from "@mui/material";
import type { CommentsListProps } from "../../types/articleDetails";
import { CommentItem } from "./CommentItem";

export const CommentsList: React.FC<CommentsListProps> = ({
  articleId,
  articleAuthorId,
  comments,
  onAddComment,
  user,
  lang,
}) => {
  return (
    <List className="article-details-comments-list">
      {comments?.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          articleId={articleId}
          articleAuthorId={articleAuthorId}
          onAddComment={onAddComment}
          user={user}
          lang={lang}
        />
      ))}
    </List>
  );
};
