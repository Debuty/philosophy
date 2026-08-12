import { apiClient } from "../../../api/client";
import type { ApiSuccess } from "../../../api/types";
import type {
  ArticleDetail,
  ArticleListItem,
  ArticleReaction,
  ArticleReactionsState,
  ArticlesListResult,
  ArticlesPagination,
  CommentDto,
  CreateArticleInput,
  ListArticlesParams,
  RelatedArticle,
  UpdateArticleInput,
} from "../types";

type ListResponse = {
  data: ArticleListItem[];
  pagination?: ArticlesPagination;
};

export async function listArticles(
  params: ListArticlesParams = {},
): Promise<ArticlesListResult> {
  const { data } = await apiClient.get<ListResponse>("/articles", {
    params: {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 20,
      ...(params.category ? { category: params.category } : {}),
      ...(params.authorId ? { authorId: params.authorId } : {}),
    },
  });

  return {
    data: data.data,
    pagination: data.pagination ?? {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 20,
      total: data.data.length,
      totalPages: 1,
    },
  };
}

export async function getArticle(id: string): Promise<ArticleDetail> {
  const { data } = await apiClient.get<ApiSuccess<ArticleDetail>>(
    `/articles/${id}`,
  );
  return data.data;
}

export async function createArticle(
  input: CreateArticleInput,
): Promise<{ id: string }> {
  const { data } = await apiClient.post<ApiSuccess<{ id: string }>>(
    "/articles",
    input,
  );
  return data.data;
}

export async function updateArticle(
  id: string,
  input: UpdateArticleInput,
): Promise<{ id: string }> {
  const { data } = await apiClient.patch<ApiSuccess<{ id: string }>>(
    `/articles/${id}`,
    input,
  );
  return data.data;
}

export async function getArticleReactions(
  id: string,
): Promise<ArticleReactionsState> {
  const { data } = await apiClient.get<ApiSuccess<ArticleReactionsState>>(
    `/articles/${id}/reactions`,
  );
  return data.data;
}

export async function setArticleReaction(
  id: string,
  reaction: ArticleReaction,
): Promise<ArticleReactionsState> {
  const { data } = await apiClient.put<ApiSuccess<ArticleReactionsState>>(
    `/articles/${id}/reactions`,
    { reaction },
  );
  return data.data;
}

export async function clearArticleReaction(
  id: string,
): Promise<ArticleReactionsState> {
  const { data } = await apiClient.delete<ApiSuccess<ArticleReactionsState>>(
    `/articles/${id}/reactions`,
  );
  return data.data;
}

export async function listComments(articleId: string): Promise<CommentDto[]> {
  const { data } = await apiClient.get<ApiSuccess<CommentDto[]>>(
    `/articles/${articleId}/comments`,
  );
  return data.data;
}

export async function listCommentReplies(
  articleId: string,
  commentId: string,
): Promise<CommentDto[]> {
  const { data } = await apiClient.get<ApiSuccess<CommentDto[]>>(
    `/articles/${articleId}/comments/${commentId}/replies`,
  );
  return data.data;
}

export async function createComment(
  articleId: string,
  content: string,
  parentId?: string,
): Promise<CommentDto> {
  const { data } = await apiClient.post<ApiSuccess<CommentDto>>(
    `/articles/${articleId}/comments`,
    { content, ...(parentId ? { parentId } : {}) },
  );
  return data.data;
}

export async function updateComment(
  articleId: string,
  commentId: string,
  content: string,
): Promise<{ id: string; content: string; updated_at: string }> {
  const { data } = await apiClient.patch<
    ApiSuccess<{ id: string; content: string; updated_at: string }>
  >(`/articles/${articleId}/comments/${commentId}`, { content });
  return data.data;
}

export async function listRelatedArticles(
  articleId: string,
  limit = 3,
): Promise<RelatedArticle[]> {
  const { data } = await apiClient.get<ApiSuccess<RelatedArticle[]>>(
    `/articles/${articleId}/related`,
    { params: { limit } },
  );
  return data.data;
}

export async function addBookmark(articleId: string): Promise<{ article_id: string }> {
  const { data } = await apiClient.post<ApiSuccess<{ article_id: string }>>(
    `/articles/${articleId}/bookmark`,
  );
  return data.data;
}

export async function removeBookmark(articleId: string): Promise<void> {
  await apiClient.delete(`/articles/${articleId}/bookmark`);
}
