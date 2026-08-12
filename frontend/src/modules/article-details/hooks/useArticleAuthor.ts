import type { ArticleDetail } from "../../articles/types";

/** Maps embedded article.profiles to the AuthorSidebar shape (no extra fetch). */
export function useArticleAuthor(article: ArticleDetail | undefined) {
  if (!article?.profiles) {
    return { authorProfile: null, isLoading: false, error: null };
  }

  return {
    authorProfile: {
      id: article.author_id,
      username: article.profiles.username,
      bio: article.profiles.bio,
      avatar_url: article.profiles.avatar_url,
    },
    isLoading: false,
    error: null,
  };
}
