import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ArticlesCard from './components/ArticlesCard';
import { useUser } from './hooks/useUser';
import { useArticles } from './hooks/useArticles';
import { useArticleData } from './hooks/useArticleData';
import './Articles.scss';
import { ROUTES } from '../../routes/pathes';
import Loading from '../../shared/loading/Loading';
import { debugLog } from '../../utils/debug';


const Articles: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useUser();
  const { data: articles, isLoading } = useArticles();
  const processedArticles = useArticleData(articles);

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
      ) : processedArticles.length > 0 ? (
        processedArticles.map(({ article, author, reactionCounts }) => (
          <ArticlesCard
            key={article.id}
            article={article}
            author={author}
            reactionCounts={reactionCounts}
          />
        ))
      ) : (
        <div className="no-articles-found">No articles found</div>
      )}
    </div>
  );
};

export default Articles;
