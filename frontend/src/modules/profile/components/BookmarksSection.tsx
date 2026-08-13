import React, { useState } from "react";
import { Paper, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import Loading from "../../../shared/loading/Loading";
import { EmptyState } from "../../../shared/components/EmptyState/EmptyState";
import type { BookmarkedArticle } from "../../articles/types";
import { useMyBookmarks } from "../hooks/useMyBookmarks";
import "./BookmarksSection.scss";

type BookmarksSectionProps = {
  enabled: boolean;
};

const BookmarkRow: React.FC<{ item: BookmarkedArticle }> = ({ item }) => {
  const navigate = useNavigate();
  const lang = useSelector((state: RootState) => state.locale.lang);

  return (
    <button
      type="button"
      className="bookmarks-section__row"
      onClick={() => navigate(`/articles/${item.id}`)}
    >
      <div className="bookmarks-section__row-main">
        <Typography component="h3" className="bookmarks-section__row-title">
          {item.title}
        </Typography>
        <Typography className="bookmarks-section__row-subtitle">
          {item.subtitle}
        </Typography>
      </div>
      <div className="bookmarks-section__row-meta">
        <span>{item.profiles.username}</span>
        <span aria-hidden="true">·</span>
        <span>{item.category}</span>
        <span aria-hidden="true">·</span>
        <span>
          {lang === "ar" ? "حُفظ" : "Saved"}{" "}
          {new Date(item.bookmarked_at).toLocaleDateString()}
        </span>
      </div>
    </button>
  );
};

const BookmarksSection: React.FC<BookmarksSectionProps> = ({ enabled }) => {
  const lang = useSelector((state: RootState) => state.locale.lang);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useMyBookmarks(enabled, {
    page: 1,
    pageSize: 20,
  });

  const bookmarks = data?.data ?? [];
  const total = data?.pagination.total ?? bookmarks.length;

  return (
    <Paper elevation={2} className="bookmarks-section">
      <button
        type="button"
        className={`bookmarks-section__trigger${isOpen ? " bookmarks-section__trigger--open" : ""}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <Typography component="h2" className="bookmarks-section__title">
          {lang === "ar" ? "المحفوظات" : "Bookmarks"}
          <span className="bookmarks-section__count">{total}</span>
        </Typography>
        <ExpandMoreIcon className="bookmarks-section__chevron" />
      </button>

      {isOpen && (
        <div className="bookmarks-section__panel">
          {isLoading ? (
            <Loading
              message={
                lang === "ar"
                  ? "جاري تحميل المحفوظات..."
                  : "Loading bookmarks..."
              }
            />
          ) : bookmarks.length > 0 ? (
            <div className="bookmarks-section__list">
              {bookmarks.map((item) => (
                <BookmarkRow key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState DataName={lang === "ar" ? "محفوظات" : "Bookmarks"} />
          )}
        </div>
      )}
    </Paper>
  );
};

export default BookmarksSection;
