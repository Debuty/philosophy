import React, { useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { BookCard } from "./components/BookCard/BookCard";
import { BooksFilterBar } from "./components/BooksFilterBar/BooksFilterBar";
import { useBooksList } from "./hooks";
import "./Books.scss";

const PAGE_SIZE = 3;

const Books: React.FC = () => {
  const { t } = useTranslation("books");
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useBooksList({
    page,
    pageSize: PAGE_SIZE,
    bookName,
    author,
  });

  const books = data?.data ?? [];
  const total = data?.pagination.total ?? books.length;
  const totalPages = data?.pagination.totalPages ?? 0;
  const isEmpty = !isLoading && !isError && books.length === 0;

  const clearFilters = () => {
    setBookName("");
    setAuthor("");
    setPage(1);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    nextPage: number,
  ) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="books">
      <header className="books__header">
        <Typography component="h1" className="books__title">
          {t("title")}
        </Typography>
        <Typography className="books__subtitle">{t("subtitle")}</Typography>
      </header>

      <BooksFilterBar
        bookName={bookName}
        author={author}
        onBookNameChange={(value) => {
          setBookName(value);
          setPage(1);
        }}
        onAuthorChange={(value) => {
          setAuthor(value);
          setPage(1);
        }}
        onClearFilters={clearFilters}
        resultsCount={total}
      />

      {isLoading ? (
        <CircularProgress sx={{ margin: "2rem auto", display: "block" }} />
      ) : isError ? (
        <Alert severity="error" className="books__error">
          {t("errorLoading")}
        </Alert>
      ) : isEmpty ? (
        <Typography className="books__empty">{t("empty")}</Typography>
      ) : (
        <Grid container spacing={3} className="books__grid">
          {books.map((book) => (
            <Grid
              key={book.id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              className="books__grid-item"
            >
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      )}

      {!isEmpty && totalPages > 1 && (
        <Box className="books__pagination">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </div>
  );
};

export default Books;
