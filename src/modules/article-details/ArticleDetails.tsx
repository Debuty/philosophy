import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { ROUTES } from '../../routes/pathes';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  DeleteForever as DeleteForeverIcon
} from '@mui/icons-material';
import Loading from '../../shared/loading/Loading';
import './ArticleDetails.scss';
import { detect } from 'tinyld';
import { getCurrentUser } from '../../utils/auth';
import type { User } from '@supabase/supabase-js';
import EditIcon from '@mui/icons-material/Edit';

// Define the comment type
interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
  } | null;
}


const ArticleDetails: React.FC = () => {
  const { article } = useLocation().state;
  // const { id } = useParams();
  const navigate = useNavigate();
  const lang = useSelector((state: RootState) => state.locale.lang);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [newComment, setNewComment] = useState('');
  // const [comments, setComments] = useState<any[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();
  useEffect(() => {
    // const fetchComments = async () => {
    //   const { data, error } = await supabase
    //     .from("comments")
    //     .select("id, content, created_at, user_id, profiles!comments_user_id_fkey1(username)")
    //     .eq("article_id", article.id)
    //     .order("created_at", { ascending: false });

    //   if (error) console.error(error);
    //   else setComments(data || []);
    // };

    // fetchComments();

    getCurrentUser().then(data => setUser(data))
  }, [article.id, user?.id]);
  const code = detect(article?.content);     // -> "ar"

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const fetchComments = async (): Promise<Comment[]> => {
    const { data, error } = await supabase
      .from("comments")
      .select("id, content, created_at, user_id, profiles!comments_user_id_fkey1(username)")
      .eq("article_id", article.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return [];
    }
    
    // Transform the data to match our Comment interface
    return data?.map(comment => ({
      ...comment,
      profiles: comment.profiles?.[0] || null
    })) || [];
  };

 const { data: comments } = useQuery<Comment[]>({
  queryKey: ['comments', article.id],
  queryFn: fetchComments,
  refetchOnWindowFocus: false,
  enabled: !!article.id
 });


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


  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = (e.target as HTMLFormElement).comment.value;
    const { data, error } = await supabase
      .from("comments")
      .insert([{ article_id: article.id, content: comment, user_id: user?.id }])
      .select();

    if (error) {
      console.error('Error adding comment:', error.message);
    } else {
      console.log(data);
    }
    setNewComment('');
    queryClient.invalidateQueries({ queryKey: ['comments', article.id] });
  };
  console.log("user in section", user)
  console.log("comments in section", comments)
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
            <Box sx={{ mb: 4 }} dir={code === "ar" ? "rtl" : "ltr"}>
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
              {lang === "ar" ? "التعليقات" : "Comments"} ({comments?.length})
            </Typography>

            {/* Add Comment Form */}
            <Box sx={{ mb: 4 }}>
              <form onSubmit={handleAddComment}>
                <TextField
                  name="comment"
                  fullWidth
                  multiline
                  rows={3}
                  placeholder={lang === "ar" ? "اكتب تعليقك هنا..." : "Write your comment here..."}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />

                {user ? (
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={!newComment.trim()}
                    sx={{
                      backgroundColor: '#534e46',
                      '&:hover': { backgroundColor: '#2c2820' }
                    }}
                  >
                    {lang === "ar" ? "إضافة تعليق" : "Add Comment"}
                  </Button>
                ) : (<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.3rem' }}>
                    {lang === "ar" ? "يجب عليك تسجيل الدخول لإضافة تعليق" : "You must be logged in to add a comment"}
                  </Typography>
                  <Button variant="contained" onClick={() => navigate(ROUTES.LOGIN)}>
                    {lang === "ar" ? "تسجيل الدخول" : "Login"}
                  </Button>
                </Box>)}
              </form>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Comments List */}
            <List className="article-details-comments-list">
              {comments?.map((comment) => (
                <ListItem key={comment.id} sx={{ alignItems: 'flex-start', mb: 2, padding: '1rem', borderRadius: '1rem', backgroundColor: ' #b8b4ad' }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#534e46' }}>
                      {comment?.profiles?.username?.charAt(0)?.toUpperCase() || '?'}
                    </Avatar>
                  </ListItemAvatar>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: '1.3rem' }}>
                        {comment.profiles?.username == user?.user_metadata.username ? 'You' : comment.profiles?.username || 'Anonymous'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '1.3rem' }}>
                        {comment.created_at ? new Date(comment.created_at).toLocaleDateString() + ' ' + new Date(comment.created_at).toLocaleTimeString() : ''}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '1.3rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1 }} >
                        {comment.profiles?.username == user?.user_metadata.username ? <EditIcon /> : ''}
                        {comment.profiles?.username == user?.user_metadata.username ? <DeleteForeverIcon /> : ''}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1, textAlign: lang === "ar" ? "right" : "left", fontSize: '1.3rem' }}>
                      {comment.content}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"

                        sx={{ color: '#534e46' }}
                      >
                        <ThumbUpIcon fontSize="small" />
                        <span style={{ fontSize: '1.3rem', marginLeft: '0.5rem' }}>0</span>
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ color: '#534e46' }}
                      >
                        <ThumbDownIcon fontSize="small" />
                        <span style={{ fontSize: '1.3rem', marginLeft: '0.5rem' }}>0</span>
                      </IconButton>
                    </Box>
                  </Box>
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
