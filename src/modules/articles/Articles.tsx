import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { User } from '@supabase/supabase-js';

import ArticlesCard from './components/ArticlesCard';
import './Articles.scss';
import { ROUTES } from '../../routes/pathes';
import { supabase } from '../../supabaseClient';
import Loading from '../../shared/loading/Loading';
import { getCurrentUser } from '../../utils/auth';
import { debugLog } from '../../utils/debug';

interface AuthorInfo {
  username: string | null;
  bio: string | null;
}

interface ReactionCounts {
  likes: number | null;
  dislikes: number | null;
}

interface Article {
  id: string;
  title: string;
  subtitle: string;
  content?: string;
  category: string;
  created_at: string;
  state?: string;
  author_id: string;
  profiles?: AuthorInfo | AuthorInfo[] | null;
  article_reaction_counts?: ReactionCounts | ReactionCounts[] | null;
}

const getArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select(
      'id,title,subtitle,category,created_at,author_id,profiles(username,bio),article_reaction_counts(likes,dislikes)'
    )
    .eq('state', 'published');

  if (error) {
    throw error;
  }

  return data ?? [];
};

const Articles: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser().then((data) => setUser(data));
  }, []);

  const {
    data: articles,
    isLoading,
  } = useQuery<Article[]>({
    queryKey: ['articles'],
    queryFn: getArticles,
  });

  debugLog(articles);

  return (
    <div className="articles">
      {user && (
        <Button
          variant="contained"
          className="articles-button"
          onClick={() => navigate(ROUTES.ADD_ARTICLE)}
        >
          {t('add_article', { ns: 'articles' })}
        </Button>
      )}

      {isLoading ? (
        <Loading />
      ) : articles && articles.length > 0 ? (
        articles.map((article) => {
          const author = Array.isArray(article.profiles)
            ? article.profiles[0]
            : article.profiles;
          const counts = Array.isArray(article.article_reaction_counts)
            ? article.article_reaction_counts[0]
            : article.article_reaction_counts;

          return (
            <ArticlesCard
              key={article.id}
              article={article}
              author={author ?? undefined}
              reactionCounts={counts ?? undefined}
            />
          );
        })
      ) : (
        <div className="no-articles-found">No articles found</div>
      )}
    </div>
  );
};

export default Articles;
