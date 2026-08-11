import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./FilterBar.scss";

interface FilterBarProps {
  searchTerm: string;
  selectedEra: string;
  selectedSchool: string;
  onSearchChange: (value: string) => void;
  onEraChange: (value: string) => void;
  onSchoolChange: (value: string) => void;
  onClearFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  selectedEra,
  selectedSchool,
  onSearchChange,
  onEraChange,
  onSchoolChange,
  onClearFilters,
}) => {
  const { t } = useTranslation("philosophers");

  return (
    <Paper
      className="filter-bar"
      elevation={2}
      sx={{ backgroundColor: "#bfbdb9 !important" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h6" className="filter-title">
          {t("Philosophers.filter.title")}
        </Typography>

        <Button
          variant="outlined"
          onClick={onClearFilters}
          style={{ margin: "1rem" }}
        >
          {t("Philosophers.filter.clearFilters")}
        </Button>
      </div>

      <Grid container spacing={3} alignItems="center">
        {/* Search Field */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label={t("Philosophers.filter.search")}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            variant="outlined"
          />
        </Grid>

        {/* Era Filter */}
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>{t("Philosophers.filter.eras.title")}</InputLabel>
            <Select
              value={selectedEra}
              onChange={(e) => onEraChange(e.target.value)}
              label={t("Philosophers.filter.eras.title")}
            >
              <MenuItem value="">
                {t("Philosophers.filter.eras.title")}
              </MenuItem>
              <MenuItem value="ancient">
                {t("Philosophers.filter.eras.ancient")}
              </MenuItem>
              <MenuItem value="medieval">
                {t("Philosophers.filter.eras.medieval")}
              </MenuItem>
              <MenuItem value="earlyModern">
                {t("Philosophers.filter.eras.earlyModern")}
              </MenuItem>
              <MenuItem value="modern">
                {t("Philosophers.filter.eras.modern")}
              </MenuItem>
              <MenuItem value="contemporary">
                {t("Philosophers.filter.eras.contemporary")}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* School Filter */}
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>{t("Philosophers.filter.schools.title")}</InputLabel>
            <Select
              value={selectedSchool}
              onChange={(e) => onSchoolChange(e.target.value)}
              label={t("Philosophers.filter.schools.title")}
            >
              <MenuItem value="">
                {t("Philosophers.filter.schools.title")}
              </MenuItem>
              <MenuItem value="idealism">
                {t("Philosophers.filter.schools.idealism")}
              </MenuItem>
              <MenuItem value="materialism">
                {t("Philosophers.filter.schools.materialism")}
              </MenuItem>
              <MenuItem value="existentialism">
                {t("Philosophers.filter.schools.existentialism")}
              </MenuItem>
              <MenuItem value="stoicism">
                {t("Philosophers.filter.schools.stoicism")}
              </MenuItem>
              <MenuItem value="epicureanism">
                {t("Philosophers.filter.schools.epicureanism")}
              </MenuItem>
              <MenuItem value="rationalism">
                {t("Philosophers.filter.schools.rationalism")}
              </MenuItem>
              <MenuItem value="empiricism">
                {t("Philosophers.filter.schools.empiricism")}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Results Count */}
      <Box className="results-info">
        <Typography variant="body2">Test</Typography>
      </Box>
    </Paper>
  );
};
