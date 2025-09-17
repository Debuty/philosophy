import { Avatar, Box, Button, Grid, Paper, Typography } from '@mui/material';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './ArticlesCard.scss';
import type { RootState } from '../../../store';
import { debugLog } from '../../../utils/debug';

interface ArticleData {
  title: string;
  subtitle: string;
  content?: string;
  category: string;
  state?: string;
  created_at: string;
  id: string;
  author_id: string;
}

interface AuthorInfo {
  username?: string | null;
  bio?: string | null;
}

interface ReactionCounts {
  likes?: number | null;
  dislikes?: number | null;
}

interface ArticlesCardProps {
  article: ArticleData;
  author?: AuthorInfo | null;
  reactionCounts?: ReactionCounts | null;
}

const ArticlesCard: React.FC<ArticlesCardProps> = ({ article, author, reactionCounts }) => {
  const lang = useSelector((state: RootState) => state.locale.lang);
  const navigate = useNavigate();

  debugLog(author);

  return (
    <div className="articles-card">
      <Paper className="articles-card-paper">
        <Grid container className="articles-card-grid">
          <Grid
            size={{ xs: 12, md: 9 }}
            className="articles-card-grid-item article-info"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              paddingRight: '3.5rem',
              textAlign: 'left',
            }}
          >
            <Typography className="articles-card-title">{article.title}</Typography>
            <Typography className="articles-card-description" sx={{ color: '#777065 !important' }}>
              {article.subtitle}
            </Typography>

            <Button
              onClick={() => navigate(`/articles/${article.id}`, { state: { article } })}
              className="articles-card-button"
              sx={{ alignSelf: 'flex-start' }}
            >
              {lang === 'ar' ? 'اقرأ المزيد' : 'Read More'}
            </Button>
          </Grid>
          <Grid
            size={{ xs: 12, md: 3 }}
            className="articles-card-grid-item author-info"
            sx={
              lang === 'ar'
                ? {
                  borderRight: '1px solid #534e46',
                  paddingRight: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }
                : {
                  borderLeft: '1px solid #534e46',
                  paddingLeft: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }
            }
          >
            <Box className="articles-card-box " sx={{ display: 'flex', gap: '1rem' }}>
              <div className="articles-card-avatar-container">
                <Avatar className="articles-card-avatar" />
              </div>
              <div className="articles-card-avatar-info-container">
                <Typography className="articles-card-avatar-name">{author?.username}</Typography>
                <Typography className="articles-card-avatar-field">{author?.bio}</Typography>
              </div>
            </Box>
            <Typography className="articles-card-time ">
              published at : {article.created_at ? new Date(article.created_at).toLocaleDateString() : 'Wrong Date'}
            </Typography>
            <Typography className="articles-card-category">
              {lang === 'ar' ? 'الفئة' : 'Category'} : {article.category}
            </Typography>
            <Box className="articles-card-button-container" sx={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
              <div className="articles-card-button-like" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ThumbUpIcon sx={{ fontSize: '2rem' }} />
                {reactionCounts?.likes ?? 0}
              </div>
              <div className="articles-card-button-dislike" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ThumbDownIcon sx={{ fontSize: '2rem' }} />
                {reactionCounts?.dislikes ?? 0}
              </div>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ArticlesCard;
