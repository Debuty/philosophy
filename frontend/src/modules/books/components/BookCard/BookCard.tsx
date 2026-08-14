import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../../store";
import type { BookListItem } from "../../types";
import "./BookCard.scss";

type BookCardProps = {
  book: BookListItem;
};

function truncate(text: string | null, max = 140): string {
  if (!text) return "";
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const lang = useSelector((state: RootState) => state.locale.lang);
  const navigate = useNavigate();

  const title = lang === "ar" ? book.title_ar : book.title_en;
  const author =
    (lang === "ar" ? book.author_ar : book.author_en) ??
    (lang === "ar" ? book.author_en : book.author_ar) ??
    "";
  const description = truncate(
    lang === "ar" ? book.description_ar : book.description_en,
  );

  return (
    <Card className="book-card">
      <CardActionArea
        className="book-card__action"
        onClick={() => navigate(`/books/${book.id}`)}
      >
        <div className="book-card__cover-wrap">
          {book.cover_image_url ? (
            <CardMedia
              component="img"
              image={book.cover_image_url}
              alt={title}
              className="book-card__cover"
              loading="lazy"
            />
          ) : (
            <div className="book-card__cover book-card__cover--placeholder">
              <MenuBookIcon className="book-card__cover-icon" />
            </div>
          )}
        </div>
        <CardContent className="book-card__content">
          <Typography component="h3" className="book-card__title">
            {title}
          </Typography>
          {author ? (
            <Typography className="book-card__author">{author}</Typography>
          ) : null}
          <Typography className="book-card__description">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
