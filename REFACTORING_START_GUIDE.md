# 🚀 Clean Code Refactoring - Start Guide

## 🎯 **Quick Start: Your First Refactoring Session**

This guide will walk you through refactoring your Philos app step by step, starting with the most impactful changes.

## 📋 **Phase 1: Foundation Setup (Day 1)**

### **Step 1: Create New Directory Structure**

```bash
# Create the new directories
mkdir -p src/types
mkdir -p src/constants
mkdir -p src/utils
mkdir -p src/services
mkdir -p src/validation
mkdir -p src/shared/components/ui
```

### **Step 2: Create Shared Types**

**Create `src/types/index.ts`:**
```typescript
// Barrel export for all types
export * from './api';
export * from './auth';
export * from './article';
export * from './user';
export * from './common';
```

**Create `src/types/common.ts`:**
```typescript
// Common utility types
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  success: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
  offset?: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
```

**Create `src/types/article.ts`:**
```typescript
import { BaseEntity } from './common';

export interface AuthorInfo {
  username: string | null;
  bio: string | null;
}

export interface ReactionCounts {
  likes: number | null;
  dislikes: number | null;
}

export interface Article extends BaseEntity {
  title: string;
  subtitle: string;
  content?: string;
  category: string;
  state?: string;
  author_id: string;
  profiles?: AuthorInfo | AuthorInfo[] | null;
  article_reaction_counts?: ReactionCounts | ReactionCounts[] | null;
}

export interface ArticleFormData {
  title: string;
  subtitle: string;
  content: string;
  category: string;
}

export interface ArticleFilters {
  category?: string;
  author?: string;
  state?: string;
  search?: string;
}
```

**Create `src/types/auth.ts`:**
```typescript
export interface User {
  id: string;
  email: string;
  username?: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  username: string;
}
```

### **Step 3: Create Constants**

**Create `src/constants/index.ts`:**
```typescript
export * from './api';
export * from './ui';
export * from './validation';
export * from './routes';
export * from './messages';
```

**Create `src/constants/api.ts`:**
```typescript
// API Configuration
export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  ARTICLES: 'articles',
  USERS: 'profiles',
  AUTH: 'auth',
} as const;

// Query Keys
export const QUERY_KEYS = {
  ARTICLES: 'articles',
  ARTICLE: 'article',
  USERS: 'users',
  USER: 'user',
  AUTH: 'auth',
} as const;
```

**Create `src/constants/validation.ts`:**
```typescript
// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  TITLE: { min: 3, max: 100 },
  CONTENT: { min: 10, max: 10000 },
} as const;

// Error Messages
export const VALIDATION_MESSAGES = {
  EMAIL_INVALID: 'Please enter a valid email address',
  USERNAME_INVALID: 'Username must be 3-20 characters (letters, numbers, underscore)',
  PASSWORD_WEAK: 'Password must be at least 8 characters with uppercase, lowercase, and number',
  TITLE_TOO_SHORT: 'Title must be at least 3 characters',
  TITLE_TOO_LONG: 'Title must be less than 100 characters',
  CONTENT_TOO_SHORT: 'Content must be at least 10 characters',
  CONTENT_TOO_LONG: 'Content must be less than 10,000 characters',
} as const;
```

### **Step 4: Create Utility Functions**

**Create `src/utils/index.ts`:**
```typescript
export * from './validation';
export * from './formatting';
export * from './api';
export * from './storage';
export * from './errors';
```

**Create `src/utils/validation.ts`:**
```typescript
import { VALIDATION_RULES, VALIDATION_MESSAGES } from '../constants/validation';

export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  if (!VALIDATION_RULES.EMAIL.test(email)) return VALIDATION_MESSAGES.EMAIL_INVALID;
  return null;
};

export const validateUsername = (username: string): string | null => {
  if (!username) return 'Username is required';
  if (!VALIDATION_RULES.USERNAME.test(username)) return VALIDATION_MESSAGES.USERNAME_INVALID;
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (!VALIDATION_RULES.PASSWORD.test(password)) return VALIDATION_MESSAGES.PASSWORD_WEAK;
  return null;
};

export const validateTitle = (title: string): string | null => {
  if (!title) return 'Title is required';
  if (title.length < VALIDATION_RULES.TITLE.min) return VALIDATION_MESSAGES.TITLE_TOO_SHORT;
  if (title.length > VALIDATION_RULES.TITLE.max) return VALIDATION_MESSAGES.TITLE_TOO_LONG;
  return null;
};

export const validateContent = (content: string): string | null => {
  if (!content) return 'Content is required';
  if (content.length < VALIDATION_RULES.CONTENT.min) return VALIDATION_MESSAGES.CONTENT_TOO_SHORT;
  if (content.length > VALIDATION_RULES.CONTENT.max) return VALIDATION_MESSAGES.CONTENT_TOO_LONG;
  return null;
};
```

## 📋 **Phase 2: Refactor First Component (Day 2)**

### **Step 5: Refactor ArticlesCard Component**

**Before (Current):**
```typescript
// src/modules/articles/components/ArticlesCard.tsx
// Large component with mixed responsibilities
```

**After (Refactored):**
```typescript
// src/modules/articles/components/ArticlesCard.tsx
import React from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Article, AuthorInfo, ReactionCounts } from '../../../types';
import { OptimizedImage } from '../../../shared/components/OptimizedImage';
import { formatDate } from '../../../utils/formatting';
import { ROUTES } from '../../../constants/routes';
import './ArticlesCard.scss';

interface ArticlesCardProps {
  article: Article;
  author: AuthorInfo | null;
  reactionCounts: ReactionCounts | null;
}

const ArticlesCard: React.FC<ArticlesCardProps> = ({
  article,
  author,
  reactionCounts,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`${ROUTES.ARTICLE_DETAILS}/${article.id}`);
  };

  const handleAuthorClick = () => {
    if (author?.username) {
      navigate(`${ROUTES.PROFILE}/${author.username}`);
    }
  };

  return (
    <Paper className="articles-card" elevation={2}>
      <Grid container spacing={2} className="articles-card-content">
        <Grid item xs={12} md={9}>
          <ArticleHeader
            title={article.title}
            subtitle={article.subtitle}
            category={article.category}
            createdAt={article.created_at}
          />
          <ArticleActions
            onReadMore={handleReadMore}
            onAuthorClick={handleAuthorClick}
            author={author}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <AuthorSection
            author={author}
            reactionCounts={reactionCounts}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

// Sub-components for better organization
const ArticleHeader: React.FC<{
  title: string;
  subtitle: string;
  category: string;
  createdAt: string;
}> = ({ title, subtitle, category, createdAt }) => (
  <Box className="article-header">
    <Typography variant="h5" className="article-title">
      {title}
    </Typography>
    <Typography variant="body1" className="article-subtitle">
      {subtitle}
    </Typography>
    <Box className="article-meta">
      <Typography variant="caption" className="article-category">
        {category}
      </Typography>
      <Typography variant="caption" className="article-date">
        {formatDate(createdAt)}
      </Typography>
    </Box>
  </Box>
);

const ArticleActions: React.FC<{
  onReadMore: () => void;
  onAuthorClick: () => void;
  author: AuthorInfo | null;
}> = ({ onReadMore, onAuthorClick, author }) => (
  <Box className="article-actions">
    <Button
      variant="contained"
      onClick={onReadMore}
      className="read-more-btn"
    >
      Read More
    </Button>
    {author && (
      <Button
        variant="text"
        onClick={onAuthorClick}
        className="author-btn"
      >
        View Profile
      </Button>
    )}
  </Box>
);

const AuthorSection: React.FC<{
  author: AuthorInfo | null;
  reactionCounts: ReactionCounts | null;
}> = ({ author, reactionCounts }) => (
  <Box className="author-section">
    <OptimizedImage
      src="/images/placeholder-avatar.jpg"
      alt={author?.username || 'Author'}
      width={75}
      height={75}
      loading="lazy"
      style={{
        borderRadius: '50%',
        border: '3px solid rgba(83, 78, 70, 0.3)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    />
    <Typography variant="h6" className="author-name">
      {author?.username || 'Unknown Author'}
    </Typography>
    <Typography variant="body2" className="author-bio">
      {author?.bio || 'No bio available'}
    </Typography>
    {reactionCounts && (
      <ReactionStats reactionCounts={reactionCounts} />
    )}
  </Box>
);

const ReactionStats: React.FC<{
  reactionCounts: ReactionCounts;
}> = ({ reactionCounts }) => (
  <Box className="reaction-stats">
    <Typography variant="caption" className="likes">
      👍 {reactionCounts.likes || 0}
    </Typography>
    <Typography variant="caption" className="dislikes">
      👎 {reactionCounts.dislikes || 0}
    </Typography>
  </Box>
);

export default ArticlesCard;
```

### **Step 6: Create Utility Functions**

**Create `src/utils/formatting.ts`:**
```typescript
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return formatDate(dateString);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
```

## 📋 **Phase 3: Create Reusable UI Components (Day 3)**

### **Step 7: Create Button Component**

**Create `src/shared/components/ui/Button/Button.tsx`:**
```typescript
import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import './Button.scss';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  children,
  disabled,
  className,
  ...props
}) => {
  const getVariant = (): MuiButtonProps['variant'] => {
    switch (variant) {
      case 'primary':
        return 'contained';
      case 'secondary':
        return 'contained';
      case 'outline':
        return 'outlined';
      case 'text':
        return 'text';
      default:
        return 'contained';
    }
  };

  return (
    <MuiButton
      variant={getVariant()}
      size={size}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      className={`custom-button custom-button--${variant} ${className || ''}`}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </MuiButton>
  );
};

export default Button;
```

**Create `src/shared/components/ui/Button/Button.scss`:**
```scss
.custom-button {
  &--primary {
    background-color: var(--primary-color);
    color: white;
    
    &:hover {
      background-color: var(--primary-color-dark);
    }
  }
  
  &--secondary {
    background-color: var(--secondary-color);
    color: white;
    
    &:hover {
      background-color: var(--secondary-color-dark);
    }
  }
  
  &--outline {
    border-color: var(--primary-color);
    color: var(--primary-color);
    
    &:hover {
      background-color: var(--primary-color);
      color: white;
    }
  }
  
  &--text {
    color: var(--primary-color);
    
    &:hover {
      background-color: var(--primary-color-light);
    }
  }
}
```

**Create `src/shared/components/ui/Button/index.ts`:**
```typescript
export { default } from './Button';
export type { ButtonProps } from './Button';
```

### **Step 8: Create Input Component**

**Create `src/shared/components/ui/Input/Input.tsx`:**
```typescript
import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import './Input.scss';

interface InputProps extends Omit<TextFieldProps, 'error'> {
  error?: string;
  label: string;
  required?: boolean;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  error,
  label,
  required = false,
  helperText,
  className,
  ...props
}) => {
  return (
    <TextField
      label={label}
      required={required}
      error={!!error}
      helperText={error || helperText}
      className={`custom-input ${className || ''}`}
      fullWidth
      {...props}
    />
  );
};

export default Input;
```

## 📋 **Phase 4: Update Existing Files (Day 4)**

### **Step 9: Update Articles Hook**

**Update `src/modules/articles/hooks/useArticles.ts`:**
```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../supabaseClient';
import { Article } from '../../../types';
import { QUERY_KEYS } from '../../../constants/api';

const getArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select(
      'id,state,title,subtitle,content,category,created_at,author_id,profiles(username,bio),article_reaction_counts(likes,dislikes)'
    )
    .eq('state', 'published');

  if (error) {
    throw new Error(`Failed to fetch articles: ${error.message}`);
  }

  return data ?? [];
};

export const useArticles = () => {
  return useQuery<Article[]>({
    queryKey: [QUERY_KEYS.ARTICLES],
    queryFn: getArticles,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
```

### **Step 10: Update Articles Component**

**Update `src/modules/articles/Articles.tsx`:**
```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useUser } from './hooks/useUser';
import { useArticles } from './hooks/useArticles';
import { useArticleData } from './hooks/useArticleData';
import ArticlesCard from './components/ArticlesCard';
import ArticlesSkeleton from '../../shared/components/ArticlesSkeleton';
import Button from '../../shared/components/ui/Button';
import { ROUTES } from '../../constants/routes';
import { debugLog } from '../../utils/debug';
import './Articles.scss';

const Articles: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useUser();
  const { data: articles, isLoading, error } = useArticles();
  const processedArticles = useArticleData(articles);

  debugLog(articles);

  const handleAddArticle = () => {
    navigate(ROUTES.ADD_ARTICLE);
  };

  if (error) {
    return (
      <div className="articles-error">
        <h2>Error loading articles</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="articles">
      <ArticlesHeader
        user={user}
        onAddArticle={handleAddArticle}
        t={t}
      />
      
      <ArticlesContent
        isLoading={isLoading}
        articles={processedArticles}
      />
    </div>
  );
};

// Sub-components for better organization
const ArticlesHeader: React.FC<{
  user: any;
  onAddArticle: () => void;
  t: any;
}> = ({ user, onAddArticle, t }) => (
  <div className="articles-header">
    {user && (
      <Button
        variant="primary"
        onClick={onAddArticle}
        className="add-article-btn"
      >
        {t('add_article', { ns: 'articles' })}
      </Button>
    )}
  </div>
);

const ArticlesContent: React.FC<{
  isLoading: boolean;
  articles: any[];
}> = ({ isLoading, articles }) => {
  if (isLoading) {
    return <ArticlesSkeleton />;
  }

  if (articles.length === 0) {
    return (
      <div className="no-articles-found">
        <h3>No articles found</h3>
        <p>Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="articles-list">
      {articles.map(({ article, author, reactionCounts }) => (
        <ArticlesCard
          key={article.id}
          article={article}
          author={author}
          reactionCounts={reactionCounts}
        />
      ))}
    </div>
  );
};

export default Articles;
```

## 🎯 **Next Steps**

### **Week 1 Goals:**
- [ ] Complete foundation setup
- [ ] Refactor ArticlesCard component
- [ ] Create Button and Input components
- [ ] Update Articles component

### **Week 2 Goals:**
- [ ] Refactor ArticleDetails component
- [ ] Create Card, Modal, and Loading components
- [ ] Update authentication components
- [ ] Add error boundaries

### **Week 3 Goals:**
- [ ] Refactor Profile components
- [ ] Create Form components
- [ ] Update data fetching hooks
- [ ] Add input validation

### **Week 4 Goals:**
- [ ] Complete component refactoring
- [ ] Add unit tests
- [ ] Update documentation
- [ ] Performance optimization

## 📚 **Resources**

### **Clean Code Principles:**
- Single Responsibility Principle
- Open/Closed Principle
- Don't Repeat Yourself (DRY)
- Keep It Simple, Stupid (KISS)

### **React Best Practices:**
- Component composition over inheritance
- Props drilling vs. context
- Custom hooks for logic reuse
- Error boundaries for error handling

### **TypeScript Best Practices:**
- Strict type checking
- Interface over type for objects
- Generic types for reusability
- Proper error handling with types

---

*Start with this guide and gradually work through each phase. Remember: refactoring is an iterative process - make small, incremental changes and test frequently.*
