import React from "react";
import { Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { ROUTES } from "../../routes/pathes";
import Loading from "../../shared/loading/Loading";
import { useBookDetails } from "../books/hooks";
import "./BookDetails.scss";

const BookDetails: React.FC = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation("books");
  const lang = useSelector((state: RootState) => state.locale.lang);
  const bookId = Number(id);
  const {
    data: book,
    isLoading,
    isError,
  } = useBookDetails(Number.isFinite(bookId) && bookId > 0 ? bookId : null);

  if (isLoading) {
    return (
      <Loading
        message={lang === "ar" ? "جاري تحميل الكتاب..." : "Loading book..."}
      />
    );
  }

  if (isError || !book) {
    return (
      <div className="book-details book-details--missing">
        <Typography className="book-details__missing-title">
          {t("details.notFound")}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(ROUTES.BOOKS)}
          sx={{
            color: "#ffffff",
            borderColor: "#534e46",
            backgroundColor: "#534e46",
            "&:hover": {
              backgroundColor: "#3f3b36",
              borderColor: "#3f3b36",
            },
          }}
        >
          {t("details.back")}
        </Button>
      </div>
    );
  }

  const title = lang === "ar" ? book.title_ar : book.title_en;
  const author =
    (lang === "ar" ? book.author_ar : book.author_en) ??
    (lang === "ar" ? book.author_en : book.author_ar) ??
    "";
  const description = lang === "ar" ? book.description_ar : book.description_en;

  return (
    <div className="book-details">
      {book.cover_image_url ? (
        <div
          className="book-details__atmosphere"
          style={{ backgroundImage: `url(${book.cover_image_url})` }}
          aria-hidden="true"
        />
      ) : null}

      <div className="book-details__shell">
        <Button
          className="book-details__back"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(ROUTES.BOOKS)}
        >
          {t("details.back")}
        </Button>

        <article className="book-details__spread">
          <div className="book-details__spine" aria-hidden="true" />

          <figure className="book-details__cover-panel">
            {book.cover_image_url ? (
              <img
                src={book.cover_image_url}
                alt={title}
                className="book-details__cover"
              />
            ) : (
              <div className="book-details__cover book-details__cover--placeholder">
                <MenuBookIcon className="book-details__cover-icon" />
              </div>
            )}
          </figure>

          <div className="book-details__page">
            {book.published_year ? (
              <p className="book-details__eyebrow">
                {t("details.publishedYear", { year: book.published_year })}
              </p>
            ) : null}
            <Typography component="h1" className="book-details__title">
              {title}
            </Typography>
            {author ? (
              <Typography className="book-details__author">
                {t("details.by", { author })}
              </Typography>
            ) : null}
            <div className="book-details__rule" aria-hidden="true" />
            <Typography className="book-details__description">
              {description}
            </Typography>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BookDetails;
