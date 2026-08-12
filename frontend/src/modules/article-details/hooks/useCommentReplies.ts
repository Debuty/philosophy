import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../api/queryKeys";
import { listCommentReplies } from "../../articles/api/articlesApi";

export function useCommentReplies(
  articleId: string,
  commentId: string,
  enabled: boolean,
) {
  return useQuery({
    queryKey: queryKeys.articles.commentReplies(articleId, commentId),
    queryFn: () => listCommentReplies(articleId, commentId),
    enabled: enabled && !!articleId && !!commentId,
  });
}
