
import { Avatar, Box, Button, Grid, Paper, Typography } from '@mui/material';
import './ArticlesCard.scss'
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';

interface ArticleData {
    title: {
        en: string;
        ar: string;
        };
    description: {
        en: string;
        ar: string;
    };
    content: {
        en: string;
        ar: string;
    };
    author_name: {
        en: string;
        ar: string;
    };
    author_field: {
        en: string;
        ar: string;
    };
    author_avatar: string;
    category: {
        en: string;
        ar: string;
    };
    date: {
        en: string;
        ar: string;
    };
    likes: number;
    dislikes: number;
}

const ArticlesCard = ({ article }: { article: ArticleData }) => {
    const lang = useSelector((state: RootState) => state.locale.lang);
    return (
        <div className="articles-card">
            <Paper className="articles-card-paper">
                <Grid container className="articles-card-grid">
                    <Grid size={{ xs: 12, md: 9 }} className="articles-card-grid-item" sx={{ display: "flex", flexDirection: "column", gap: "1rem", paddingRight: "3.5rem", textAlign: 'justify' }} >
                        <Typography className="articles-card-title">
                            {lang == "ar" ? article.title.ar : article.title.en}
                        </Typography>
                        <Typography className="articles-card-description" sx={{ color: "#777065 !important" }}>
                            {lang == "ar" ? article.description.ar : article.description.en}
                        </Typography>

                        <Button className="articles-card-button" sx={{ alignSelf: "flex-start" }}>
                            {lang == "ar" ? "اقرأ المزيد" : "Read More"}
                        </Button>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }} className="articles-card-grid-item" sx={lang == "ar" ? { borderRight: "1px solid #534e46", paddingRight: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" } : { borderLeft: "1px solid #534e46", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }} >
                        <Box className="articles-card-box" sx={{ display: "flex", gap: "1rem" }}>
                            <div className="articles-card-avatar-container">
                                <Avatar className="articles-card-avatar" src={article.author_avatar} />
                            </div>
                            <div className="articles-card-avatar-info-container">
                                <Typography className="articles-card-avatar-name">
                                    {lang == "ar" ? article.author_name.ar : article.author_name.en}
                                </Typography>
                                <Typography className="articles-card-avatar-field">
                                    {lang == "ar" ? article.author_field.ar : article.author_field.en}
                                </Typography>
                            </div>
                        </Box>
                        <Typography className="articles-card-time">
                            Time: {lang == "ar" ? article.date.ar : article.date.en}
                        </Typography>
                        <Typography className="articles-card-category">{lang == "ar" ? "الفئة" : "Category"} : {lang == "ar" ? article.category.ar : article.category.en}</Typography>
                        <Box className="articles-card-button-container" sx={{ display: "flex", gap: "1rem" }}>
                            <Button className="articles-card-button-like" variant='outlined'>
                                like {article.likes}
                            </Button>
                            <Button className="articles-card-button-dislike" variant='outlined'>
                                dislike {article.dislikes}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default ArticlesCard;