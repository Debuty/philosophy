export type BookListItem = {
  id: number;
  title_en: string;
  title_ar: string;
  author_en: string | null;
  author_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  cover_image_url: string | null;
  published_year: number | null;
};

export type BookDetail = BookListItem;

export type ListBooksParams = {
  page?: number;
  pageSize?: number;
  bookName?: string;
  author?: string;
};

export type BooksPagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type BooksListResult = {
  data: BookListItem[];
  pagination: BooksPagination;
};
