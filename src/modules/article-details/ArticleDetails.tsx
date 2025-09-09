import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { ROUTES } from '../../routes/pathes';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../supabaseClient';
import {
  Paper,
  Typography,
  Button,
  Grid,
  Box,
  Avatar,
  Divider,
  Chip,
  IconButton
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon
} from '@mui/icons-material';
import Loading from '../../shared/loading/Loading';
import './ArticleDetails.scss';


const ArticleDetails: React.FC = () => {
  const { article } = useLocation().state;
  const navigate = useNavigate();
  const lang = useSelector((state: RootState) => state.locale.lang);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getAuthorProfile = async () => {
    if (article?.author_id) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', article.author_id)
        .single();
      if (error) throw error;
      return data;
    }
    return null;
  };

  const { data: authorProfile, isLoading, error } = useQuery({
    queryKey: ['profile', article?.author_id],
    queryFn: getAuthorProfile,
    refetchOnWindowFocus: false,
    enabled: !!article?.author_id
  });

  const handleLike = () => {
    setLikes(prev => prev == 1 ? 0 : prev + 1);
  };

  const handleDislike = () => {
    setDislikes(prev => prev == 1 ? 0 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(prev => !prev);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.subtitle,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  if (isLoading) {
    return <Loading message="Loading article..." />;
  }

  if (error || !article) {
    return (
      <div className="article-details">
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error">
            {lang === "ar" ? "خطأ في تحميل المقال" : "Error loading article"}
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate(ROUTES.ARTICLS)}
            sx={{ mt: 2 }}
          >
            {lang === "ar" ? "العودة للمقالات" : "Back to Articles"}
          </Button>
        </Paper>
      </div>
    );
  }

  return (
    <div className="article-details">
      {/* Back Button */}
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(ROUTES.ARTICLS)}
        sx={{ mb: 3 }}
      >
        {lang === "ar" ? "العودة للمقالات" : "Back to Articles"}
      </Button>

      <Grid container spacing={4}>
        {/* Main Article Content */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={2} sx={{ p: 4, backgroundColor: "rgb(174 171 165) !important" }}>
            {/* Article Header */}
            <Box sx={{ mb: 4 }}>
              <Chip 
                label={article.category} 
                sx={{ mb: 2 }}
              />
              <Typography variant="h3" component="h1" gutterBottom>
                {article.title}
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
                {article.subtitle}
              </Typography>
              
              {/* Article Meta */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  {new Date(article.created_at).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {article.state}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Article Content */}
            <Box className="article-content">
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: '1.7rem',
                  textAlign: 'justify',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {article.content}
              </Typography>
            </Box>
            <Divider sx={{ mb: 4 }} />
            {/* Article Actions */}
            <Box sx={{ display: 'flex', gap: 2, mt: 4, pt: 3, flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                startIcon={<ThumbUpIcon />}
                onClick={handleLike}
                sx={{ minWidth: 100 }}
              >
                {likes} {lang === "ar" ? "إعجاب" : "Like"}
              </Button>
              <Button
                variant="outlined"
                startIcon={<ThumbDownIcon />}
                onClick={handleDislike}
                sx={{ minWidth: 100, whiteSpace: 'nowrap' }}
              >
                {dislikes} {lang === "ar" ? "عدم إعجاب" : "Dislike"}
              </Button>
              <div className="article-details-actions">
                 <IconButton onClick={handleBookmark} color={isBookmarked ? "primary" : "default"}>
                <BookmarkIcon />
              </IconButton>
              <IconButton onClick={handleShare}>
                <ShareIcon />
              </IconButton>
              </div>
            </Box>
          </Paper>
        </Grid>

        {/* Author Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={2} sx={{ p: 3, backgroundColor: "rgb(174 171 165) !important" }}>
            <Typography variant="h6" gutterBottom>
              {lang === "ar" ? "عن الكاتب" : "About the Author"}
            </Typography>
            
            {authorProfile && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Avatar 
                  src={authorProfile.avatar_url} 
                  sx={{ width: 80, height: 80, mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  {authorProfile.username}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {authorProfile.bio}
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => navigate(`/profile/${article.author_id}`)}
                  sx={{ border:"none"}}
                >
                  {lang === "ar" ? "عرض الملف الشخصي" : "View Profile"}
                </Button>
              </Box>
            )}
          </Paper>

          {/* Related Articles Placeholder */}
          <Paper elevation={2} sx={{ p: 3, mt: 3, backgroundColor: "rgb(174 171 165) !important" }}>
            <Typography variant="h6" gutterBottom>
              {lang === "ar" ? "مقالات ذات صلة" : "Related Articles"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {lang === "ar" ? "المزيد من المقالات قريباً..." : "More articles coming soon..."}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ArticleDetails;
