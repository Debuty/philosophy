import React, { useEffect, useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  Box,
  Typography,
  IconButton,
  Button,
  Collapse,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Edit as EditIcon,
  DeleteForever as DeleteForeverIcon,
} from "@mui/icons-material";
import type { CommentDto } from "../../../articles/types";
import { useCommentReplies } from "../../hooks/useCommentReplies";
import { useCommentReactions } from "../../hooks/useCommentReactions";
import { useUpdateComment } from "../../hooks/useUpdateComment";
import { useDeleteComment } from "../../hooks/useDeleteComment";
import { CommentForm } from "./CommentForm";
import Loading from "../../../../shared/loading/Loading";

const ACTIVE_REACTION_COLOR = "#8B5A2B";

type CommentItemProps = {
  comment: CommentDto;
  articleId: string;
  articleAuthorId: string;
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
  articleAuthorId,
  onAddComment,
  user,
  lang,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const updateComment = useUpdateComment(articleId);
  const deleteComment = useDeleteComment(articleId);
  const {
    counts: reactionCounts,
    myReaction,
    handleReaction,
    isPending: reactionPending,
  } = useCommentReactions(articleId, comment, user?.id || null);
  const isOwner = Boolean(user?.id && user.id === comment.user_id);
  const canDelete = Boolean(
    user?.id && (user.id === comment.user_id || user.id === articleAuthorId),
  );
  const isBusy =
    updateComment.isPending || deleteComment.isPending || reactionPending;

  useEffect(() => {
    if (!isEditing) {
      setEditText(comment.content);
    }
  }, [comment.content, isEditing]);

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

  const handleStartEdit = () => {
    setEditText(comment.content);
    setIsEditing(true);
    setShowReply(false);
  };

  const handleCancelEdit = () => {
    setEditText(comment.content);
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    const next = editText.trim();
    if (!next || next === comment.content) {
      setIsEditing(false);
      return;
    }

    updateComment.mutate(
      {
        commentId: comment.id,
        content: next,
        parentId: comment.parent_id,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const handleConfirmDelete = () => {
    deleteComment.mutate(
      {
        commentId: comment.id,
        parentId: comment.parent_id,
      },
      {
        onSuccess: () => {
          setDeleteOpen(false);
        },
      },
    );
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
            {isOwner && !isEditing && (
              <IconButton
                size="small"
                onClick={handleStartEdit}
                disabled={isBusy}
                aria-label={lang === "ar" ? "تعديل التعليق" : "Edit comment"}
                sx={{ color: "#534e46" }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            {canDelete && !isEditing && (
              <IconButton
                size="small"
                onClick={() => setDeleteOpen(true)}
                disabled={isBusy}
                aria-label={lang === "ar" ? "حذف التعليق" : "Delete comment"}
                sx={{ color: "#534e46" }}
              >
                <DeleteForeverIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          {isEditing ? (
            <Box sx={{ mb: 1 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                disabled={updateComment.isPending}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleSaveEdit}
                  disabled={isBusy || !editText.trim()}
                  startIcon={
                    updateComment.isPending ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : undefined
                  }
                  sx={{
                    backgroundColor: "#534e46",
                    "&:hover": { backgroundColor: "#2c2820" },
                  }}
                >
                  {updateComment.isPending
                    ? lang === "ar"
                      ? "جاري الحفظ..."
                      : "Saving..."
                    : lang === "ar"
                      ? "حفظ"
                      : "Save"}
                </Button>
                <Button
                  size="small"
                  onClick={handleCancelEdit}
                  disabled={isBusy}
                >
                  {lang === "ar" ? "إلغاء" : "Cancel"}
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ mb: 1, fontSize: "1.3rem" }}>
              {comment.content}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <IconButton
              size="small"
              onClick={() => handleReaction("like")}
              disabled={isBusy}
              sx={{
                color:
                  myReaction === "like" ? ACTIVE_REACTION_COLOR : "#534e46",
                direction: "ltr",
                "& svg path": {
                  fill:
                    myReaction === "like"
                      ? `${ACTIVE_REACTION_COLOR} !important`
                      : "#534e46",
                },
              }}
            >
              <ThumbUpIcon fontSize="small" />
              <span
                style={{
                  fontSize: "1.3rem",
                  marginLeft: "0.5rem",
                  color:
                    myReaction === "like" ? ACTIVE_REACTION_COLOR : "#534e46",
                  fontWeight: myReaction === "like" ? 700 : 400,
                }}
              >
                {reactionCounts.likes}
              </span>
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleReaction("dislike")}
              disabled={isBusy}
              sx={{
                color:
                  myReaction === "dislike" ? ACTIVE_REACTION_COLOR : "#534e46",
                direction: "ltr",
                "& svg path": {
                  fill:
                    myReaction === "dislike"
                      ? `${ACTIVE_REACTION_COLOR} !important`
                      : "#534e46",
                },
              }}
            >
              <ThumbDownIcon fontSize="small" />
              <span
                style={{
                  fontSize: "1.3rem",
                  marginLeft: "0.5rem",
                  color:
                    myReaction === "dislike"
                      ? ACTIVE_REACTION_COLOR
                      : "#534e46",
                  fontWeight: myReaction === "dislike" ? 700 : 400,
                }}
              >
                {reactionCounts.dislikes}
              </span>
            </IconButton>
            {!isEditing && (
              <Button
                size="small"
                onClick={() => setShowReply((prev) => !prev)}
                sx={{ textTransform: "none", color: "#534e46" }}
              >
                {lang === "ar" ? "رد" : "Reply"}
              </Button>
            )}
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

          <Collapse in={showReply && !isEditing}>
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
              message={
                lang === "ar" ? "جاري تحميل الردود..." : "Loading replies..."
              }
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
                articleAuthorId={articleAuthorId}
                onAddComment={onAddComment}
                user={user}
                lang={lang}
              />
            ))
          )}
        </Box>
      </Collapse>

      <Dialog
        open={deleteOpen}
        onClose={
          deleteComment.isPending ? undefined : () => setDeleteOpen(false)
        }
      >
        <DialogTitle>
          {lang === "ar" ? "حذف التعليق" : "Delete comment"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {lang === "ar"
              ? "هل تريد حذف هذا التعليق؟ لا يمكن التراجع عن هذا الإجراء."
              : "Do you want to delete this comment? This action cannot be undone."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteOpen(false)}
            disabled={deleteComment.isPending}
          >
            {lang === "ar" ? "لا" : "No"}
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={deleteComment.isPending}
            startIcon={
              deleteComment.isPending ? (
                <CircularProgress size={16} color="inherit" />
              ) : undefined
            }
          >
            {deleteComment.isPending
              ? lang === "ar"
                ? "جاري الحذف..."
                : "Deleting..."
              : lang === "ar"
                ? "نعم، احذف"
                : "Yes, delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
};
