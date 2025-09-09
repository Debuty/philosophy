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
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
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
import { detect } from 'tinyld';


const ArticleDetails: React.FC = () => {
  const { article } = useLocation().state;
  const navigate = useNavigate();
  const lang = useSelector((state: RootState) => state.locale.lang);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Ahmed Hassan',
      avatar: '',
      content: 'لقد أعجبني هذا المقال جداً لأنه ينقل المعرفة الفلسفية بشكل يسهل فهمه للجميع',
      timestamp: '2 hours ago',
      likes: 5
    },
    {
      id: 2,
      author: 'Sarah Johnson',
      avatar: '',
      content: 'Great read! The author has done an excellent job explaining complex philosophical concepts in an accessible way. Looking forward to more articles like this.',
      timestamp: '1 day ago',
      likes: 3
    }
  ]);

  const code = detect(article?.content);     // -> "ar"

console.log(code)

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

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: 'You',
        avatar: '',
        content: newComment,
        timestamp: 'Just now',
        likes: 0
      };
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    }
  };

  const handleLikeComment = (commentId: number) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
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
            <Box sx={{ mb: 4 }}  dir={code === "ar" ? "rtl" : "ltr"}>
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
            <Box className="article-content" dir={code === "ar" ? "rtl" : "ltr"}>
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

          {/* Comments Section */}
          <Paper elevation={2} sx={{ p: 4, mt: 3, backgroundColor: "rgb(174 171 165) !important" }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              {lang === "ar" ? "التعليقات" : "Comments"} ({comments.length})
            </Typography>

            {/* Add Comment Form */}
            <Box sx={{ mb: 4 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder={lang === "ar" ? "اكتب تعليقك هنا..." : "Write your comment here..."}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                sx={{
                  backgroundColor: '#534e46',
                  '&:hover': { backgroundColor: '#2c2820' }
                }}
              >
                {lang === "ar" ? "إضافة تعليق" : "Add Comment"}
              </Button>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Comments List */}
            <List>
              {comments.map((comment) => (
                <ListItem key={comment.id} sx={{ alignItems: 'flex-start', mb: 2 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#534e46' }}>
                      {comment.author.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {comment.author}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {comment.timestamp}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" sx={{ mb: 1 , textAlign:lang === "ar" ? "right" : "left" }}>
                          {comment.content}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleLikeComment(comment.id)}
                            sx={{ color: '#534e46' }}
                          >
                            <ThumbUpIcon fontSize="small" />
                          </IconButton>
                          <Typography variant="caption" color="text.secondary">
                            {comment.likes} {lang === "ar" ? "إعجاب" : "likes"}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
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
                  sx={{ border: "none" }}
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
