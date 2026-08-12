import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKeys } from "../../../api/queryKeys";
import { isApiError } from "../../../api/types";
import { updateArticle } from "../api/articlesApi";
import type { UpdateArticleInput } from "../types";

type UpdateArticleVariables = {
  id: string;
  input: UpdateArticleInput;
};

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: UpdateArticleVariables) =>
      updateArticle(id, input),
    onSuccess: (_data, variables) => {
      toast.success("Article updated successfully");
      void queryClient.invalidateQueries({
        queryKey: queryKeys.articles.detail(variables.id),
      });
      void queryClient.invalidateQueries({
        queryKey: [...queryKeys.articles.all, "list"],
      });
      void queryClient.invalidateQueries({
        queryKey: [...queryKeys.articles.all, "related"],
      });
    },
    onError: (error) => {
      toast.error(
        isApiError(error) ? error.message : "Failed to update article",
      );
    },
  });
}
