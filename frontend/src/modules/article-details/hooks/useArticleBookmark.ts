import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useOptimistic, startTransition } from "react";
import { toast } from "react-toastify";
import { queryKeys } from "../../../api/queryKeys";
import { isApiError } from "../../../api/types";
import {
  addBookmark,
  removeBookmark,
} from "../../articles/api/articlesApi";
import type { ArticleDetail } from "../../articles/types";

export function useArticleBookmark(
  articleId: string,
  userId: string | null,
  initialBookmarked = false,
) {
  const queryClient = useQueryClient();

  const [optimisticBookmarked, setOptimisticBookmarked] = useOptimistic(
    initialBookmarked,
    (_current: boolean, next: boolean) => next,
  );

  const syncBookmarkedOnDetail = (next: boolean) => {
    queryClient.setQueryData<ArticleDetail>(
      queryKeys.articles.detail(articleId),
      (old) => (old ? { ...old, is_bookmarked: next } : old),
    );
    void queryClient.invalidateQueries({
      queryKey: [...queryKeys.articles.all, "list"],
    });
    void queryClient.invalidateQueries({
      queryKey: [...queryKeys.articles.all, "bookmarks"],
    });
  };

  const handleBookmark = useCallback(() => {
    if (!userId) {
      toast.error("Please log in to bookmark articles");
      return;
    }

    const next = !optimisticBookmarked;

    startTransition(async () => {
      setOptimisticBookmarked(next);

      try {
        if (next) {
          await addBookmark(articleId);
        } else {
          await removeBookmark(articleId);
        }
        syncBookmarkedOnDetail(next);
      } catch (error) {
        if (next && isApiError(error) && error.statusCode === 409) {
          syncBookmarkedOnDetail(true);
          return;
        }
        toast.error(
          isApiError(error)
            ? error.message
            : next
              ? "Failed to bookmark"
              : "Failed to remove bookmark",
        );
        // No cache update → useOptimistic rolls back when the transition ends
      }
    });
  }, [
    userId,
    optimisticBookmarked,
    articleId,
    setOptimisticBookmarked,
    queryClient,
  ]);

  return { isBookmarked: optimisticBookmarked, handleBookmark };
}
