// Header component constants
export const HEADER_CONSTANTS = {
  COLORS: {
    PRIMARY: '#534e46',
    BACKGROUND: '#b1aea9',
    HOVER: '#e0e0e0',
    TEXT: '#333',
  },
  DIMENSIONS: {
    DRAWER_WIDTH: 280,
    AVATAR_SIZE: '5rem',
    ICON_SIZE: '3rem',
    BUTTON_HEIGHT: '3rem',
  },
  SPACING: {
    GAP_SMALL: '10px',
    GAP_MEDIUM: '20px',
    MARGIN_BOTTOM: '2rem',
  },
} as const;

export const NAVIGATION_ITEMS = [
  { key: 'home', path: 'HOME' },
  { key: 'philosophers', path: 'PHILOSOPHERS' },
  { key: 'articles', path: 'ARTICLS' },
  { key: 'schools', path: 'SCHOOLS' },
] as const;
