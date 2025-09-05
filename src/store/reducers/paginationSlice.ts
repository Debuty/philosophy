import { createSlice } from "@reduxjs/toolkit";

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  itemsPerPage: 12,
  totalItems: 0,
  totalPages: 0,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      // Reset to first page when changing items per page
      state.currentPage = 1;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
      // Recalculate total pages
      state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    resetPagination: (state) => {
      state.currentPage = 1;
      state.totalItems = 0;
      state.totalPages = 0;
    },
    nextPage: (state) => {
      if (state.currentPage < state.totalPages) {
        state.currentPage += 1;
      }
    },
    previousPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
  },
});

export const {
  setCurrentPage,
  setItemsPerPage,
  setTotalItems,
  setTotalPages,
  resetPagination,
  nextPage,
  previousPage,
} = paginationSlice.actions;

export default paginationSlice.reducer;
