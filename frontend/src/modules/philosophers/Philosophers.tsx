import React, { useState } from "react";
import {
  Grid,
  Pagination,
  Box,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Philosophers.scss";
import { PhilosopherCard } from "./components/philosopherCard/PhilosopherCard";
import { FilterBar } from "./components/FilterBar/FilterBar";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../store/reducers/paginationSlice";
import type { AppDispatch, RootState } from "../../store";
import { usePhilosophersList } from "./hooks";
import type { EraSlug, SchoolSlug } from "./types";

const Philosophers: React.FC = () => {
  const { t } = useTranslation("philosophers");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEra, setSelectedEra] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );

  const cardsPerPage = 3;

  const { data, isLoading, error } = usePhilosophersList({
    page: currentPage,
    pageSize: cardsPerPage,
    search: searchTerm,
    era: selectedEra as EraSlug | "",
    school: selectedSchool as SchoolSlug | "",
  });

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    dispatch(setCurrentPage(1));
  };

  const handleEraChange = (value: string) => {
    setSelectedEra(value);
    dispatch(setCurrentPage(1));
  };

  const handleSchoolChange = (value: string) => {
    setSelectedSchool(value);
    dispatch(setCurrentPage(1));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedEra("");
    setSelectedSchool("");
    dispatch(setCurrentPage(1));
  };

  const totalPages = data?.pagination.totalPages ?? 0;
  const philosophers = data?.data ?? [];
  const hasActiveFilters = Boolean(
    searchTerm.trim() || selectedEra || selectedSchool,
  );
  const isEmpty = !isLoading && !error && philosophers.length === 0;

  return (
    <div className="philosophers">
      <FilterBar
        searchTerm={searchTerm}
        selectedEra={selectedEra}
        selectedSchool={selectedSchool}
        onSearchChange={handleSearchChange}
        onEraChange={handleEraChange}
        onSchoolChange={handleSchoolChange}
        onClearFilters={handleClearFilters}
      />

      {isLoading ? (
        <CircularProgress sx={{ margin: "auto", display: "block" }} />
      ) : error ? (
        <Alert
          severity="error"
          sx={{ margin: "2rem auto", display: "block", fontSize: "2rem" }}
        >
          {t("Philosophers.errorLoading")}
        </Alert>
      ) : isEmpty ? (
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            margin: "4rem auto",
            fontSize: "2rem",
            color: "text.secondary",
          }}
        >
          {hasActiveFilters
            ? t("Philosophers.emptyFiltered")
            : t("Philosophers.empty")}
        </Typography>
      ) : (
        <Grid container spacing={3} className="philosophers__grid">
          {philosophers.map((philosopher) => (
            <Grid
              key={philosopher.id}
              size={{ xs: 12, sm: 6, md: 4 }}
              className="philosophers__grid-item"
            >
              <PhilosopherCard philosopher={philosopher} />
            </Grid>
          ))}
        </Grid>
      )}

      {!isEmpty && totalPages > 1 && (
        <Box className="pagination-container">
          <Pagination
            count={totalPages}
            page={currentPage}
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

export default Philosophers;
