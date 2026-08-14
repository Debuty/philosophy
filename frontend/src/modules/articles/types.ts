export type ArticleState = "draft" | "published";

export type ArticleProfile = {
  username: string;
  bio: string | null;
  avatar_url: string | null;
};

export type ReactionCounts = {
  likes: number;
  dislikes: number;
};

export type ArticleReaction = "like" | "dislike";

/** Present only when the request is authenticated */
export type ArticleReactionsState = ReactionCounts & {
  my_reaction?: ArticleReaction | null;
};

export type ArticleListItem = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  category: string;
  state: ArticleState;
  author_id: string;
  created_at: string;
  profiles: ArticleProfile;
  article_reaction_counts: ReactionCounts;
  /** Present only when the request is authenticated */
  is_bookmarked?: boolean;
};

export type ArticleDetail = ArticleListItem & {
  updated_at: string;
};

export type ListArticlesParams = {
  page?: number;
  pageSize?: number;
  category?: string;
  authorId?: string;
};

export type ArticlesPagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type ArticlesListResult = {
  data: ArticleListItem[];
  pagination: ArticlesPagination;
};

export type CreateArticleInput = {
  title: string;
  subtitle: string;
  content: string;
  category: string;
  state: ArticleState;
};

export type UpdateArticleInput = Partial<CreateArticleInput>;

export type CommentDto = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  article_id: string;
  parent_id: string | null;
  depth: number;
  replies_count: number;
  profiles: { username: string; avatar_url: string | null } | null;
  comment_reaction_counts: ArticleReactionsState;
};

export type RelatedArticle = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  created_at: string;
};

export type BookmarkedArticle = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  created_at: string;
  bookmarked_at: string;
  profiles: { username: string };
};

export type ListBookmarksParams = {
  page?: number;
  pageSize?: number;
};

export type BookmarksListResult = {
  data: BookmarkedArticle[];
  pagination: ArticlesPagination;
};

export type ProcessedArticle = {
  article: ArticleListItem;
  author?: ArticleProfile;
  reactionCounts?: ReactionCounts;
};
