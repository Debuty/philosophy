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

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  article_id: string;
  profiles: { username: string } | null;
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
}

export interface CommentsSectionProps {
  comments: Comment[];
  onAddComment: (content: string, userId: string) => Promise<void>;
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
}

export interface CommentsListProps {
  comments: Comment[];
}

export interface BackButtonProps {
  onClick: () => void;
  lang: string;
}

export interface ErrorStateProps {
  onRetry: () => void;
  lang?: string;
}
