import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { queryKeys } from "../../../api/queryKeys";
import { isApiError } from "../../../api/types";
import {
  clearArticleReaction,
  getArticleReactions,
  setArticleReaction,
} from "../../articles/api/articlesApi";
import type { ArticleReaction } from "../../articles/types";

export const useArticleReactions = (
  articleId: string,
  userId: string | null,
) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: queryKeys.articles.reactions(articleId),
    queryFn: () => getArticleReactions(articleId),
    enabled: !!articleId,
  });

 
  const syncReactionsCache = (payload: {
    likes: number;
    dislikes: number;
    my_reaction?: ArticleReaction | null;
  }) => {
    queryClient.setQueryData(queryKeys.articles.reactions(articleId), payload);
    void queryClient.invalidateQueries({
      queryKey: [...queryKeys.articles.all, "list"],
    });
  };

  const setMutation = useMutation({
    mutationFn: (reactionType: ArticleReaction) =>
      setArticleReaction(articleId, reactionType),
    onSuccess: syncReactionsCache,
    onError: (error) => {
      toast.error(
        isApiError(error) ? error.message : "Failed to react to article",
      );
    },
  });

  const clearMutation = useMutation({
    mutationFn: () => clearArticleReaction(articleId),
    onSuccess: syncReactionsCache,
    onError: (error) => {
      toast.error(
        isApiError(error) ? error.message : "Failed to remove reaction",
      );
    },
  });

  const handleReaction = useCallback(
    (reactionType: ArticleReaction) => {
      if (!userId) {
        toast.error("Please log in to react to articles");
        return;
      }

      if (data?.my_reaction === reactionType) {
        clearMutation.mutate();
        return;
      }

      setMutation.mutate(reactionType);
    },
    [userId, data?.my_reaction, clearMutation, setMutation],
  );

  return {
    counts: {
      likes: data?.likes ?? 0,
      dislikes: data?.dislikes ?? 0,
    },
    myReaction: data?.my_reaction ?? null,
    handleReaction,
  };
};
