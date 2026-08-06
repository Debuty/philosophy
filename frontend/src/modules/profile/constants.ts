// Profile component constants
export const PROFILE_CONSTANTS = {
  STATS_CARDS: [
    { key: 'articles_count', label: 'Articles' },
    { key: 'books_to_read_count', label: 'Books to read' },
    { key: 'books_reading_count', label: 'Books reading' },
    { key: 'books_read_count', label: 'Books read' },
    { key: 'books_favorites_count', label: 'Books favorites' },
  ],
  GRID_SIZES: { xs: 12, sm: 6, md: 2.4 },
  SIDEBAR_SIZE: { xs: 12, md: 3 },
  MAIN_SIZE: { xs: 12, md: 9 },
  AVATAR_SIZE: 80,
} as const;

export const TOAST_PROPS = {
  position: "top-right" as const,
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "light" as const,
};
