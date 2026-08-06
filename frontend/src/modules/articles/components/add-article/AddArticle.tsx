import React, { useEffect, useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { User } from '@supabase/supabase-js';
import { getCurrentUser } from '../../../../utils/auth';
import { supabase } from '../../../../supabaseClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';

import { detect} from "tinyld";
import { ROUTES } from '../../../../routes/pathes';
import { useNavigate } from 'react-router-dom';
import { debugLog } from '../../../../utils/debug';

const code = detect("هذا نص عربي");     // -> "ar"
const top3 = detect("Hello world ");
//  const english = code || top3;
debugLog(code)
debugLog(top3)

const addArticleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  content: z.string().min(1, 'Content is required'),
  category: z.string().min(1, 'Category is required'),
});

type AddArticleFormData = z.infer<typeof addArticleSchema>;

const AddArticle: React.FC = () => {
  const { t } = useTranslation('articles');
  const [status, setStatus] = useState('draft');
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  debugLog(user)
  useEffect(() => {
    getCurrentUser().then((data: User | null) => setUser(data))
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm<AddArticleFormData>({
    resolver: zodResolver(addArticleSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      content: '',
      category: 'Philosophy of Mind',
    },

  });

  const addArticle = async (data: AddArticleFormData) => {
    const { data: dataArticle, error } = await supabase
      .from("articles")
      .insert({
        title: data.title,
        subtitle: data.subtitle,
        content: data.content,
        category: data.category,
        state: status,
      })
      .select("id")
      .single();
    if (error) {
      throw error;
    }
    else {
      return dataArticle;
    }
  }

  const { mutate, } = useMutation({
    mutationFn: addArticle,
    onSuccess: (data) => {
      debugLog(data);
      toast.success('Article added successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    },
  });


  const onSubmit = (data: AddArticleFormData) => {
    const dataForm = {
      ...data,
      status: status,
    }
   
    const code = detect(dataForm.content);
    debugLog(code)
    mutate(dataForm);
    navigate(ROUTES.ARTICLS);
  };

  return (
    <div className="add-article">
      <Paper elevation={2} sx={{ p: 4, mx: 'auto', backgroundColor: " rgb(193, 188, 181)" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('add_article_page.title')}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          {t('add_article_page.subtitle')}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Title Box */}
          <Paper elevation={1} sx={{ p: 3, mb: 3, backgroundColor: "rgb(174 171 165) !important" }}>
            <InputLabel>{t('add_article_page.form.title')}</InputLabel>
            <TextField
              fullWidth
              label=""
              variant="outlined"
              defaultValue="The Allegory of the Cave"
              placeholder={t('add_article_page.form.title_placeholder')}
              sx={{ mb: 2 }}
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Paper>

          {/* Subtitle Box */}
          <Paper elevation={1} sx={{ p: 3, mb: 3, backgroundColor: "rgb(174 171 165) !important" }}>
            <InputLabel>{t('add_article_page.form.subtitle')}</InputLabel>
            <TextField
              fullWidth
              label=""
              variant="outlined"
              placeholder={t('add_article_page.form.subtitle_placeholder')}
              sx={{ mb: 2 }}
              {...register('subtitle')}
              error={!!errors.subtitle}
              helperText={errors.subtitle?.message}
            />
          </Paper>

          {/* Article Content Box */}
          <Paper elevation={1} sx={{ p: 3, mb: 3, backgroundColor: "rgb(174 171 165) !important" }}>
            <InputLabel>{t('add_article_page.form.content')}</InputLabel>
            <TextField
              fullWidth
              label=""
              multiline
              rows={8}
              variant="outlined"
              placeholder={t('add_article_page.form.content_placeholder')}
              sx={{ mb: 2 }}
              {...register('content')}
              error={!!errors.content}
              helperText={errors.content?.message}

            />
          </Paper>

          {/* Category and Tags Box */}
          <Paper elevation={1} sx={{ p: 3, mb: 3, backgroundColor: "rgb(174 171 165) !important" }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <InputLabel>{t('add_article_page.form.category')}</InputLabel>
                <Select
                  defaultValue="Philosophy of Mind"
                  label=""
                  fullWidth
                  {...register('category')}
                  error={!!errors.category} 
                 className='add-article-select'
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
                {errors.category && <Typography color="error">{errors.category.message}</Typography>}
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
              type="submit"
              onClick={() => setStatus('draft')}
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
              type="submit"
              onClick={() => setStatus('published')}
            >
              {t('add_article_page.buttons.publish')}
            </Button>
          </Box>
        </Box>

      </Paper>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default AddArticle;
