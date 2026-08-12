import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKeys } from "../../../api/queryKeys";
import { isApiError } from "../../../api/types";
import { updateComment } from "../../articles/api/articlesApi";

type UpdateCommentVariables = {
  commentId: string;
  content: string;
  parentId?: string | null;
};

export function useUpdateComment(articleId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: UpdateCommentVariables) =>
      updateComment(articleId, commentId, content),
    onSuccess: (_data, variables) => {
      toast.success("Comment updated");

      // Reply: refresh only that parent's replies thread.
      // Root: refresh only the roots list (exact — never replies).
      if (variables.parentId) {
        void queryClient.invalidateQueries({
          queryKey: queryKeys.articles.commentReplies(
            articleId,
            variables.parentId,
          ),
        });
      } else {
        void queryClient.invalidateQueries({
          queryKey: queryKeys.articles.comments(articleId),
          exact: true,
        });
      }
    },
    onError: (error) => {
      toast.error(
        isApiError(error) ? error.message : "Failed to update comment",
      );
    },
  });
}
