
import { Avatar, Box, Button, Grid, Paper, Typography } from '@mui/material';
import './ArticlesCard.scss'
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../supabaseClient';
import Loading from '../../../shared/loading/Loading';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

interface ArticleData {
    title: string;
    subtitle: string;
    content: string;
    category: string;
    state: string;
    created_at: string;
    id: string;
    author_id: string;
    // author_name: string;
    // author_field: string;
    // author_avatar: string;
    // category: string;
    // date: string;
    // likes: number;
    // dislikes: number;
}

const ArticlesCard = ({ article }: { article: ArticleData }) => {
    const lang = useSelector((state: RootState) => state.locale.lang);
    const navigate = useNavigate();

    const getAuthorProfile = async () => {
        const user_info = article.author_id
        if (user_info) {
            const { data, error } = await supabase.from('profiles').select('*').eq('id', user_info).single();
            if (error) throw error;
            return data;
        }
        return null
    }

    const getCounts = async () => {
        const { data, error } = await supabase.from('article_reaction_counts').select('*').eq('article_id', article.id).single();
        if (error) throw error;
        return data;
    }

    const { data: counts } = useQuery({
        queryKey: ['article_reaction_counts', article.id],
        queryFn: () => getCounts(),
        refetchOnWindowFocus: false
    })

    // get profile
    const { data: authorProfile, isLoading, error } = useQuery({
        queryKey: ['profile', article.author_id],
        queryFn: () => getAuthorProfile(),
        refetchOnWindowFocus: false
    })
    console.log(authorProfile)

    if (isLoading) {
        return <Loading message="Loading article..." />
    }
    if (error) {
        return <div>Error loading article</div>
    }

    return (
        <div className="articles-card">
            <Paper className="articles-card-paper">
                <Grid container className="articles-card-grid">
                    <Grid size={{ xs: 12, md: 9 }} className="articles-card-grid-item article-info" sx={{ display: "flex", flexDirection: "column", gap: "1rem", paddingRight: "3.5rem", textAlign: 'left' }} >
                        <Typography className="articles-card-title">
                            {article.title}
                        </Typography>
                        <Typography className="articles-card-description" sx={{ color: "#777065 !important" }}>
                            {article.subtitle}
                        </Typography>

                        <Button onClick={() => navigate(`/articles/${article.id}`, { state: { article } })} className="articles-card-button" sx={{ alignSelf: "flex-start" }}>
                            {lang == "ar" ? "اقرأ المزيد" : "Read More"}
                        </Button>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }} className="articles-card-grid-item author-info" sx={lang == "ar" ? { borderRight: "1px solid #534e46", paddingRight: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" } : { borderLeft: "1px solid #534e46", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }} >
                        <Box className="articles-card-box " sx={{ display: "flex", gap: "1rem" }}>
                            <div className="articles-card-avatar-container">
                                <Avatar className="articles-card-avatar" />
                            </div>
                            <div className="articles-card-avatar-info-container">
                                <Typography className="articles-card-avatar-name">
                                    {authorProfile?.username}
                                </Typography>
                                <Typography className="articles-card-avatar-field">
                                    {authorProfile?.bio}
                                </Typography>
                            </div>
                        </Box>
                        <Typography className="articles-card-time ">
                            Time: {article.created_at ? new Date(article.created_at).toLocaleDateString() : "Wrong Date"}
                        </Typography>
                        <Typography className="articles-card-category">{lang == "ar" ? "الفئة" : "Category"} : {article.category}</Typography>
                        <Box className="articles-card-button-container" sx={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
                            <div className="articles-card-button-like" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} >
                                <ThumbUpIcon sx={{ fontSize: '2rem' }} /> {counts ? counts.likes : 0}
                            </div>
                            <div className="articles-card-button-dislike" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} >
                                <ThumbDownIcon sx={{ fontSize: '2rem' }} /> {counts ? counts.dislikes : 0}
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default ArticlesCard;