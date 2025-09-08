import React from 'react';
import { 
  Paper, 
  TextField, 
  Grid, 
  Box, 
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import './AddArticle.scss';

const AddArticle: React.FC = () => {
  const { t } = useTranslation('articles');
  
  return (
    <div className="add-article">
      <Paper elevation={2} sx={{ p: 4, mx: 'auto' , backgroundColor:" rgb(193, 188, 181)" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('add_article_page.title')}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          {t('add_article_page.subtitle')}
        </Typography>

        <Box component="form" noValidate>
          {/* Title Box */}
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <InputLabel>{t('add_article_page.form.title')}</InputLabel>
            <TextField
              fullWidth
              label=""
              variant="outlined"
              defaultValue="The Allegory of the Cave"
              placeholder={t('add_article_page.form.title_placeholder')}
              sx={{ mb: 2 }}
            />
          </Paper>

          {/* Subtitle Box */}
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <InputLabel>{t('add_article_page.form.subtitle')}</InputLabel>
            <TextField
              fullWidth
              label=""
              variant="outlined"
              placeholder={t('add_article_page.form.subtitle_placeholder')}
              sx={{ mb: 2 }}
            />
          </Paper>

          {/* Article Content Box */}
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <InputLabel>{t('add_article_page.form.content')}</InputLabel>
            <TextField
              fullWidth
              label=""
              multiline
              rows={8}
              variant="outlined"
              placeholder={t('add_article_page.form.content_placeholder')}
              sx={{ mb: 2 }}
              
            />
          </Paper>

          {/* Category and Tags Box */}
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <InputLabel>{t('add_article_page.form.category')}</InputLabel>
                <Select
                  value="Philosophy of Mind"
                  label={t('add_article_page.form.category')}
                  fullWidth
                >
                  <MenuItem value="Philosophy of Mind">{t('add_article_page.categories.philosophy_of_mind')}</MenuItem>
                  <MenuItem value="Ethics">{t('add_article_page.categories.ethics')}</MenuItem>
                  <MenuItem value="Metaphysics">{t('add_article_page.categories.metaphysics')}</MenuItem>
                  <MenuItem value="Epistemology">{t('add_article_page.categories.epistemology')}</MenuItem>
                  <MenuItem value="Logic">{t('add_article_page.categories.logic')}</MenuItem>
                  <MenuItem value="Aesthetics">{t('add_article_page.categories.aesthetics')}</MenuItem>
                  <MenuItem value="Political Philosophy">{t('add_article_page.categories.political_philosophy')}</MenuItem>
                  <MenuItem value="Philosophy of Science">{t('add_article_page.categories.philosophy_of_science')}</MenuItem>
                  <MenuItem value="Philosophy of Religion">{t('add_article_page.categories.philosophy_of_religion')}</MenuItem>
                </Select>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <InputLabel>{t('add_article_page.form.tags')}</InputLabel>
                <TextField
                  fullWidth
                  label=""
                  placeholder={t('add_article_page.form.tags_placeholder')}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500
              }}
            >
              {t('add_article_page.buttons.save_draft')}
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0'
                }
              }}
            >
              {t('add_article_page.buttons.publish')}
            </Button>
          </Box>
        </Box>
        
      </Paper>
    </div>
  );
};

export default AddArticle;
