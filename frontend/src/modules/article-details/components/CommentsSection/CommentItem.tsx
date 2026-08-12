import React, { useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  Box,
  Typography,
  IconButton,
  Button,
  Collapse,
} from "@mui/material";
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Edit as EditIcon,
  DeleteForever as DeleteForeverIcon,
} from "@mui/icons-material";
import type { CommentDto } from "../../../articles/types";
import { useCommentReplies } from "../../hooks/useCommentReplies";
import { CommentForm } from "./CommentForm";
import Loading from "../../../../shared/loading/Loading";

type CommentItemProps = {
  comment: CommentDto;
  articleId: string;
  onAddComment: (
    content: string,
    userId?: string,
    parentId?: string,
  ) => Promise<void>;
  user: { id: string; email?: string } | null;
  lang: string;
};

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  articleId,
  onAddComment,
  user,
  lang,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const {
    data: replies = [],
    isLoading: repliesLoading,
    isFetching: repliesFetching,
  } = useCommentReplies(articleId, comment.id, expanded);

  const handleToggleReplies = () => {
    setExpanded((prev) => !prev);
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !user) return;

    try {
      await onAddComment(replyText, user.id, comment.id);
      setReplyText("");
      setShowReply(false);
      setExpanded(true);
    } catch {
      // Error toast handled in hook
    }
  };

  const repliesLabel =
    lang === "ar"
      ? expanded
        ? "إخفاء الردود"
        : `عرض الردود (${comment.replies_count})`
      : expanded
        ? "Hide replies"
        : `View replies (${comment.replies_count})`;

  return (
    <ListItem
      sx={{
        alignItems: "flex-start",
        mb: 2,
        padding: "1rem",
        borderRadius: "1rem",
        backgroundColor: "#b8b4ad",
        direction: "ltr",
        display: "block",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "#534e46" }}>
            {comment.profiles?.username?.charAt(0)?.toUpperCase() || "?"}
          </Avatar>
        </ListItemAvatar>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              sx={{ fontSize: "1.3rem" }}
            >
              {comment.profiles?.username || "Anonymous"}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: "1.3rem" }}
            >
              {comment.created_at
                ? `${new Date(comment.created_at).toLocaleDateString()} ${new Date(comment.created_at).toLocaleTimeString()}`
                : ""}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontSize: "1.3rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <EditIcon />
              <DeleteForeverIcon />
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mb: 1, fontSize: "1.3rem" }}>
            {comment.content}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <IconButton size="small" sx={{ color: "#534e46", direction: "ltr" }}>
              <ThumbUpIcon fontSize="small" />
              <span style={{ fontSize: "1.3rem", marginLeft: "0.5rem" }}>
                {comment.comment_reaction_counts?.likes ?? 0}
              </span>
            </IconButton>
            <IconButton size="small" sx={{ color: "#534e46", direction: "ltr" }}>
              <ThumbDownIcon fontSize="small" />
              <span style={{ fontSize: "1.3rem", marginLeft: "0.5rem" }}>
                {comment.comment_reaction_counts?.dislikes ?? 0}
              </span>
            </IconButton>
            <Button
              size="small"
              onClick={() => setShowReply((prev) => !prev)}
              sx={{ textTransform: "none", color: "#534e46" }}
            >
              {lang === "ar" ? "رد" : "Reply"}
            </Button>
            {comment.replies_count > 0 && (
              <Button
                size="small"
                onClick={handleToggleReplies}
                sx={{ textTransform: "none", color: "#534e46" }}
              >
                {repliesLabel}
              </Button>
            )}
          </Box>

          <Collapse in={showReply}>
            <Box sx={{ mt: 2 }}>
              <CommentForm
                onSubmit={handleReplySubmit}
                value={replyText}
                onChange={setReplyText}
                user={user}
                lang={lang}
                submitLabel={lang === "ar" ? "إرسال الرد" : "Post reply"}
              />
            </Box>
          </Collapse>
        </Box>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ mt: 2, ml: { xs: 1, sm: 4 } }}>
          {(repliesLoading || repliesFetching) && replies.length === 0 ? (
            <Loading
              message={lang === "ar" ? "جاري تحميل الردود..." : "Loading replies..."}
            />
          ) : replies.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              {lang === "ar" ? "لا توجد ردود بعد." : "No replies yet."}
            </Typography>
          ) : (
            replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                articleId={articleId}
                onAddComment={onAddComment}
                user={user}
                lang={lang}
              />
            ))
          )}
        </Box>
      </Collapse>
    </ListItem>
  );
};
