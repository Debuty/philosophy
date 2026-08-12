import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Box,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateArticle } from "../../../articles/hooks/useUpdateArticle";
import type { ArticleDetail, ArticleState } from "../../../articles/types";

const editArticleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
});

type EditArticleFormData = z.infer<typeof editArticleSchema>;

type EditArticleModalProps = {
  open: boolean;
  onClose: () => void;
  article: ArticleDetail;
};

export const EditArticleModal: React.FC<EditArticleModalProps> = ({
  open,
  onClose,
  article,
}) => {
  const { t } = useTranslation("articles");
  const submitStateRef = useRef<ArticleState>(article.state);
  const updateArticle = useUpdateArticle();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EditArticleFormData>({
    resolver: zodResolver(editArticleSchema),
    defaultValues: {
      title: article.title,
      subtitle: article.subtitle,
      content: article.content,
      category: article.category,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        title: article.title,
        subtitle: article.subtitle,
        content: article.content,
        category: article.category,
      });
      submitStateRef.current = article.state;
    }
  }, [open, article, reset]);

  const onSubmit = (data: EditArticleFormData) => {
    updateArticle.mutate(
      {
        id: article.id,
        input: {
          ...data,
          state: submitStateRef.current,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  const isPending = updateArticle.isPending;

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      <DialogTitle>{t("edit_article_page.title")}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          {t("edit_article_page.subtitle")}
        </Typography>

        <Box
          component="form"
          id="edit-article-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputLabel sx={{ mb: 1 }}>{t("add_article_page.form.title")}</InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={t("add_article_page.form.title_placeholder")}
            sx={{ mb: 3 }}
            disabled={isPending}
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <InputLabel sx={{ mb: 1 }}>
            {t("add_article_page.form.subtitle")}
          </InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={t("add_article_page.form.subtitle_placeholder")}
            sx={{ mb: 3 }}
            disabled={isPending}
            {...register("subtitle")}
            error={!!errors.subtitle}
            helperText={errors.subtitle?.message}
          />

          <InputLabel sx={{ mb: 1 }}>
            {t("add_article_page.form.content")}
          </InputLabel>
          <TextField
            fullWidth
            multiline
            rows={8}
            variant="outlined"
            placeholder={t("add_article_page.form.content_placeholder")}
            sx={{ mb: 3 }}
            disabled={isPending}
            {...register("content")}
            error={!!errors.content}
            helperText={errors.content?.message}
          />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel sx={{ mb: 1 }}>
                {t("add_article_page.form.category")}
              </InputLabel>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                    disabled={isPending}
                    error={!!errors.category}
                  >
                    <MenuItem value="Philosophy of Mind">
                      {t("add_article_page.categories.philosophy_of_mind")}
                    </MenuItem>
                    <MenuItem value="Ethics">
                      {t("add_article_page.categories.ethics")}
                    </MenuItem>
                    <MenuItem value="Metaphysics">
                      {t("add_article_page.categories.metaphysics")}
                    </MenuItem>
                    <MenuItem value="Epistemology">
                      {t("add_article_page.categories.epistemology")}
                    </MenuItem>
                    <MenuItem value="Logic">
                      {t("add_article_page.categories.logic")}
                    </MenuItem>
                    <MenuItem value="Aesthetics">
                      {t("add_article_page.categories.aesthetics")}
                    </MenuItem>
                    <MenuItem value="Political Philosophy">
                      {t("add_article_page.categories.political_philosophy")}
                    </MenuItem>
                    <MenuItem value="Philosophy of Science">
                      {t("add_article_page.categories.philosophy_of_science")}
                    </MenuItem>
                    <MenuItem value="Philosophy of Religion">
                      {t("add_article_page.categories.philosophy_of_religion")}
                    </MenuItem>
                  </Select>
                )}
              />
              {errors.category && (
                <Typography color="error">{errors.category.message}</Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1, flexWrap: "wrap" }}>
        <Button onClick={onClose} disabled={isPending}>
          {t("edit_article_page.buttons.cancel")}
        </Button>
        <Button
          type="submit"
          form="edit-article-form"
          variant="outlined"
          disabled={isPending}
          onClick={() => {
            submitStateRef.current = "draft";
          }}
          startIcon={
            isPending ? <CircularProgress size={18} color="inherit" /> : undefined
          }
        >
          {isPending
            ? t("edit_article_page.buttons.saving")
            : t("edit_article_page.buttons.save_draft")}
        </Button>
        <Button
          type="submit"
          form="edit-article-form"
          variant="contained"
          disabled={isPending}
          onClick={() => {
            submitStateRef.current = "published";
          }}
          startIcon={
            isPending ? <CircularProgress size={18} color="inherit" /> : undefined
          }
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
        >
          {isPending
            ? t("edit_article_page.buttons.saving")
            : t("edit_article_page.buttons.publish")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
