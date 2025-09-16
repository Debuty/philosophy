import React, { useEffect, useState } from 'react';
import './Articles.scss';
// import { supabase } from '../../supabaseClient';
import ArticlesCard from './components/ArticlesCard';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../routes/pathes';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/auth';
import type { User } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../supabaseClient';
import Loading from '../../shared/loading/Loading';
import { debugLog } from '../../utils/debug';

const Articles: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

const getArticles = async () => {
  const { data, error } = await supabase.from('articles').select('*').eq('state', 'published');
  if (error) throw error;
  return data;
}
  
 
const [user, setUser] = useState<User | null>(null)
useEffect(() => {
  // checkSession()
  getCurrentUser().then(data => setUser(data))


}, [])



const { data: articles, isLoading } = useQuery({
  queryKey: ['articles'],
  queryFn: () => getArticles(),
})

  debugLog(articles)
  return (
    <div className="articles">
      {user && (
      <Button variant="contained" className="articles-button" onClick={() => navigate(ROUTES.ADD_ARTICLE)}>
      {t("add_article", { ns: "articles" })}
      </Button>
      )}
      {isLoading ? <Loading />
      :articles && articles.length > 0 ? articles?.map((article) => (
        <ArticlesCard article={article} key={article.id} />
      )): <div className="no-articles-found">No articles found</div>}
        
    
    </div>
  );
};

export default Articles;
