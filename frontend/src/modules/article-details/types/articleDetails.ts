import type { CommentDto } from "../../articles/types";

// Define types locally for now
interface Article {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  category: string;
  state?: string;
  author_id: string;
  created_at: string;
}

interface ReactionCounts {
  likes: number | null;
  dislikes: number | null;
}

interface User {
  id: string;
  email?: string;
}

interface Profile {
  id: string;
  username: string | null;
  bio: string | null;
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ArticleDetailsProps {
  articleId: string;
}

export interface ArticleHeaderProps {
  article: Article;
  detectedLanguage: string;
}

export interface ArticleContentProps {
  content: string;
  detectedLanguage: string;
}

export interface ArticleActionsProps {
  counts: ReactionCounts;
  onLike: () => void;
  onDislike: () => void;
  onBookmark: () => void;
  onShare: () => void;
  isBookmarked: boolean;
  myReaction?: "like" | "dislike" | null;
}

export interface CommentsSectionProps {
  articleId: string;
  articleAuthorId: string;
  comments: CommentDto[];
  onAddComment: (
    content: string,
    userId?: string,
    parentId?: string,
  ) => Promise<void>;
  user: User | null;
  lang: string;
}

export interface AuthorSidebarProps {
  authorProfile: Profile | null;
  article: Article;
  lang: string;
}

export interface CommentFormProps {
  onSubmit: (e: React.FormEvent) => void;
  value: string;
  onChange: (value: string) => void;
  user: User | null;
  lang: string;
  submitLabel?: string;
}

export interface CommentsListProps {
  articleId: string;
  articleAuthorId: string;
  comments: CommentDto[];
  onAddComment: (
    content: string,
    userId?: string,
    parentId?: string,
  ) => Promise<void>;
  user: User | null;
  lang: string;
}

export interface BackButtonProps {
  onClick: () => void;
  lang: string;
}

export interface ErrorStateProps {
  onRetry: () => void;
  lang?: string;
}
