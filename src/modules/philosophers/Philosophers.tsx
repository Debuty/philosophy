import React, { useState, useMemo } from 'react';
import {
  Grid,
  Pagination,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import './philosophers.scss';
import { PhilosopherCard } from './components/philosopherCard/PhilosopherCard';
import { PhilosophersData } from './data/PhilosophersData';

const philosophers: React.FC = () => {
  const { t } = useTranslation('philosophers');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEra, setSelectedEra] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const cardsPerPage = 12;

  // Filter philosophers based on search and filters
  const filteredPhilosophers = useMemo(() => {
    return PhilosophersData.filter(philosopher => {
      const matchesSearch = philosopher.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        philosopher.name.ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
        philosopher.shortDescription.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        philosopher.shortDescription.ar.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEra = !selectedEra || philosopher.era.en === selectedEra || philosopher.era.ar === selectedEra;
      const matchesSchool = !selectedSchool || philosopher.school.en === selectedSchool || philosopher.school.ar === selectedSchool;
      return matchesSearch && matchesEra && matchesSchool;
    });
  }, [searchTerm, selectedEra, selectedSchool]);

  // Calculate total pages based on filtered data
  const totalPages = Math.ceil(filteredPhilosophers.length / cardsPerPage);

  // Paginate filtered philosophers
  const paginatedPhilosophers = useMemo(() => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return filteredPhilosophers.slice(startIndex, endIndex);
  }, [filteredPhilosophers, currentPage]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedEra('');
    setSelectedSchool('');
    setCurrentPage(1);
  };

  return (
    <div className="philosophers">
      {/* Filter Bar */}
      <Paper className="filter-bar" elevation={2} sx={{ backgroundColor: "	#bfbdb9 !important" }}>
        <Typography variant="h6" className="filter-title">
          {t('Philosophers.filter.title')}
        </Typography>

        <Grid container spacing={3} alignItems="center">
          {/* Search Field */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label={t('Philosophers.filter.search')}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              variant="outlined"
            />
          </Grid>

          {/* Era Filter */}
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>{t('Philosophers.filter.eras.title')}</InputLabel>
              <Select
                value={selectedEra}
                onChange={(e) => {
                  setSelectedEra(e.target.value);
                  setCurrentPage(1);
                }}
                label={t('Philosophers.filter.eras.title')}
              >
                <MenuItem value="">{t('Philosophers.filter.eras.title')}</MenuItem>
                <MenuItem value="ancient">{t('Philosophers.filter.eras.ancient')}</MenuItem>
                <MenuItem value="medieval">{t('Philosophers.filter.eras.medieval')}</MenuItem>
                <MenuItem value="earlyModern">{t('Philosophers.filter.eras.earlyModern')}</MenuItem>
                <MenuItem value="modern">{t('Philosophers.filter.eras.modern')}</MenuItem>
                <MenuItem value="contemporary">{t('Philosophers.filter.eras.contemporary')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* School Filter */}
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>{t('Philosophers.filter.schools.title')}</InputLabel>
              <Select
                value={selectedSchool}
                onChange={(e) => {
                  setSelectedSchool(e.target.value);
                  setCurrentPage(1);
                }}
                label={t('Philosophers.filter.schools.title')}
              >
                <MenuItem value="">{t('Philosophers.filter.schools.title')}</MenuItem>
                <MenuItem value="idealism">{t('Philosophers.filter.schools.idealism')}</MenuItem>
                <MenuItem value="materialism">{t('Philosophers.filter.schools.materialism')}</MenuItem>
                <MenuItem value="existentialism">{t('Philosophers.filter.schools.existentialism')}</MenuItem>
                <MenuItem value="stoicism">{t('Philosophers.filter.schools.stoicism')}</MenuItem>
                <MenuItem value="epicureanism">{t('Philosophers.filter.schools.epicureanism')}</MenuItem>
                <MenuItem value="rationalism">{t('Philosophers.filter.schools.rationalism')}</MenuItem>
                <MenuItem value="empiricism">{t('Philosophers.filter.schools.empiricism')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Clear Filters Button */}
          <Grid size={{ xs: 12, md: 2 }}>
            <Button
              variant="outlined"
              onClick={handleClearFilters}
              fullWidth

            >
              {t('Philosophers.filter.clearFilters')}
            </Button>
          </Grid>
        </Grid>

        {/* Results Count */}
        <Box className="results-info">
          <Typography variant="body2">
            {filteredPhilosophers.length === 0
              ? t('Philosophers.filter.noResults')
              : `${filteredPhilosophers.length} ${t('Philosophers.filter.resultsFound', { defaultValue: 'results found' })}`
            }
          </Typography>
        </Box>
      </Paper>

      {/* Philosopher Cards */}
      <Grid container spacing={3}>
        {paginatedPhilosophers.map((philosopher) => (
          <Grid key={philosopher.id} size={{ xs: 12, md: 4 }}>
            <PhilosopherCard philosopher={philosopher} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
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

export default philosophers;

