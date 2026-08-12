import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { queryKeys } from "../../../api/queryKeys";
import { isApiError } from "../../../api/types";
import { createArticle } from "../api/articlesApi";
import type { CreateArticleInput } from "../types";

export function useCreateArticle() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (input: CreateArticleInput) => createArticle(input),
    onSuccess: () => {
      toast.success("Article added successfully");
      void queryClient.invalidateQueries({
        queryKey: [...queryKeys.articles.all, "list"],
      });
      navigate(`/articles`);
    },
    onError: (error) => {
      toast.error(
        isApiError(error) ? error.message : "Failed to create article",
      );
    },
  });
}
