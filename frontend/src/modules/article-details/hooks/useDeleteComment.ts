import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKeys } from "../../../api/queryKeys";
import { isApiError } from "../../../api/types";
import { deleteComment } from "../../articles/api/articlesApi";

type DeleteCommentVariables = {
  commentId: string;
  parentId?: string | null;
};

export function useDeleteComment(articleId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: DeleteCommentVariables) =>
      deleteComment(articleId, commentId),
    onSuccess: (_data, variables) => {
      toast.success("Comment deleted");

      // Always refresh roots (list + replies_count).
      void queryClient.invalidateQueries({
        queryKey: queryKeys.articles.comments(articleId),
        exact: true,
      });

      // If it was a reply, refresh that parent's replies thread once.
      if (variables.parentId) {
        void queryClient.invalidateQueries({
          queryKey: queryKeys.articles.commentReplies(
            articleId,
            variables.parentId,
          ),
        });
      }
    },
    onError: (error) => {
      toast.error(
        isApiError(error) ? error.message : "Failed to delete comment",
      );
    },
  });
}
