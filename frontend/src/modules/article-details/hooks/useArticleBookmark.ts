import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { queryKeys } from "../../../api/queryKeys";
import { isApiError } from "../../../api/types";
import {
  addBookmark,
  removeBookmark,
} from "../../articles/api/articlesApi";

export function useArticleBookmark(
  articleId: string,
  userId: string | null,
  initialBookmarked = false,
) {
  const queryClient = useQueryClient();
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  useEffect(() => {
    setIsBookmarked(initialBookmarked);
  }, [articleId, initialBookmarked]);

  const invalidateArticleQueries = () => {
    void queryClient.invalidateQueries({
      queryKey: queryKeys.articles.detail(articleId),
    });
    void queryClient.invalidateQueries({
      queryKey: [...queryKeys.articles.all, "list"],
    });
    void queryClient.invalidateQueries({
      queryKey: queryKeys.articles.bookmarks({}),
    });
  };

  const addMutation = useMutation({
    mutationFn: () => addBookmark(articleId),
    onSuccess: () => {
      setIsBookmarked(true);
      invalidateArticleQueries();
    },
    onError: (error) => {
      if (isApiError(error) && error.statusCode === 409) {
        setIsBookmarked(true);
        return;
      }
      toast.error(isApiError(error) ? error.message : "Failed to bookmark");
    },
  });

  const removeMutation = useMutation({
    mutationFn: () => removeBookmark(articleId),
    onSuccess: () => {
      setIsBookmarked(false);
      invalidateArticleQueries();
    },
    onError: (error) => {
      toast.error(
        isApiError(error) ? error.message : "Failed to remove bookmark",
      );
    },
  });

  const handleBookmark = useCallback(() => {
    if (!userId) {
      toast.error("Please log in to bookmark articles");
      return;
    }
    if (isBookmarked) {
      removeMutation.mutate();
    } else {
      addMutation.mutate();
    }
  }, [userId, isBookmarked, addMutation, removeMutation]);

  return { isBookmarked, handleBookmark };
}
