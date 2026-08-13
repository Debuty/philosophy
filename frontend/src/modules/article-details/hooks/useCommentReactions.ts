import { useQueryClient } from "@tanstack/react-query";
import {
  useCallback,
  useOptimistic,
  useTransition,
} from "react";
import { toast } from "react-toastify";
import { queryKeys } from "../../../api/queryKeys";
import { isApiError } from "../../../api/types";
import {
  clearCommentReaction,
  setCommentReaction,
} from "../../articles/api/articlesApi";
import type {
  ArticleReaction,
  ArticleReactionsState,
  CommentDto,
} from "../../articles/types";

type ReactionState = {
  likes: number;
  dislikes: number;
  my_reaction: ArticleReaction | null;
};

function applyOptimisticReaction(
  current: ReactionState,
  nextReaction: ArticleReaction | null,
): ReactionState {
  let likes = current.likes;
  let dislikes = current.dislikes;

  if (current.my_reaction === "like") likes = Math.max(0, likes - 1);
  if (current.my_reaction === "dislike") dislikes = Math.max(0, dislikes - 1);

  if (nextReaction === "like") likes += 1;
  if (nextReaction === "dislike") dislikes += 1;

  return {
    likes,
    dislikes,
    my_reaction: nextReaction,
  };
}

function patchCommentReactions(
  comments: CommentDto[] | undefined,
  commentId: string,
  counts: ArticleReactionsState,
): CommentDto[] | undefined {
  if (!comments) return comments;
  return comments.map((comment) =>
    comment.id === commentId
      ? { ...comment, comment_reaction_counts: counts }
      : comment,
  );
}

export function useCommentReactions(
  articleId: string,
  comment: CommentDto,
  userId: string | null,
) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const serverState: ReactionState = {
    likes: comment.comment_reaction_counts.likes ?? 0,
    dislikes: comment.comment_reaction_counts.dislikes ?? 0,
    my_reaction: comment.comment_reaction_counts.my_reaction ?? null,
  };

  const [optimisticState, setOptimisticReaction] = useOptimistic(
    serverState,
    applyOptimisticReaction,
  );

  const syncCommentCache = (payload: ArticleReactionsState) => {
    if (comment.parent_id) {
      queryClient.setQueryData<CommentDto[]>(
        queryKeys.articles.commentReplies(articleId, comment.parent_id),
        (old) => patchCommentReactions(old, comment.id, payload),
      );
    } else {
      queryClient.setQueryData<CommentDto[]>(
        queryKeys.articles.comments(articleId),
        (old) => patchCommentReactions(old, comment.id, payload),
      );
    }
  };

  const handleReaction = useCallback(
    (reactionType: ArticleReaction) => {
      if (!userId) {
        toast.error("Please log in to react to comments");
        return;
      }

      const nextReaction: ArticleReaction | null =
        optimisticState.my_reaction === reactionType ? null : reactionType;

      startTransition(async () => {
        setOptimisticReaction(nextReaction);

        try {
          const result =
            nextReaction === null
              ? await clearCommentReaction(articleId, comment.id)
              : await setCommentReaction(
                  articleId,
                  comment.id,
                  nextReaction,
                );

          syncCommentCache(result);
        } catch (error) {
          toast.error(
            isApiError(error)
              ? error.message
              : "Failed to react to comment",
          );
          // No cache update → useOptimistic rolls back when the transition ends
        }
      });
    },
    [
      userId,
      optimisticState.my_reaction,
      articleId,
      comment.id,
      comment.parent_id,
      setOptimisticReaction,
      queryClient,
    ],
  );

  return {
    counts: {
      likes: optimisticState.likes,
      dislikes: optimisticState.dislikes,
    },
    myReaction: optimisticState.my_reaction,
    handleReaction,
    isPending,
  };
}
