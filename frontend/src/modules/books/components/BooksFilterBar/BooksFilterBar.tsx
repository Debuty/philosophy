import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./BooksFilterBar.scss";

type BooksFilterBarProps = {
  bookName: string;
  author: string;
  onBookNameChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  onClearFilters: () => void;
  resultsCount: number;
};

export const BooksFilterBar: React.FC<BooksFilterBarProps> = ({
  bookName,
  author,
  onBookNameChange,
  onAuthorChange,
  onClearFilters,
  resultsCount,
}) => {
  const { t } = useTranslation("books");

  return (
    <Paper className="books-filter-bar" elevation={2}>
      <div className="books-filter-bar__header">
        <Typography variant="h6" className="books-filter-bar__title">
          {t("filter.title")}
        </Typography>
        <Button variant="outlined" onClick={onClearFilters}>
          {t("filter.clear")}
        </Button>
      </div>

      <Grid container spacing={3} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label={t("filter.bookName")}
            value={bookName}
            onChange={(e) => onBookNameChange(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label={t("filter.author")}
            value={author}
            onChange={(e) => onAuthorChange(e.target.value)}
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Box className="books-filter-bar__results">
        <Typography variant="body2">
          {t("filter.results", { count: resultsCount })}
        </Typography>
      </Box>
    </Paper>
  );
};
