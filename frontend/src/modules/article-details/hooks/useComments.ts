import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { queryKeys } from "../../../api/queryKeys";
import { isApiError } from "../../../api/types";
import { createComment, listComments } from "../../articles/api/articlesApi";

type AddCommentInput = {
  content: string;
  parentId?: string;
};

export const useComments = (articleId: string) => {
  const queryClient = useQueryClient();

  const { data: comments } = useQuery({
    queryKey: queryKeys.articles.comments(articleId),
    queryFn: () => listComments(articleId),
    enabled: !!articleId,
  });

  const mutation = useMutation({
    mutationFn: ({ content, parentId }: AddCommentInput) =>
      createComment(articleId, content, parentId),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.articles.comments(articleId),
      });
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
      toast.error(isApiError(error) ? error.message : "Failed to add comment");
    },
  });

  const addComment = useCallback(
    async (content: string, _userId?: string, parentId?: string) => {
      await mutation.mutateAsync({ content, parentId });
    },
    [mutation],
  );

  return {
    comments: comments ?? [],
    addComment,
  };
};
