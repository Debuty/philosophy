import React, { useState } from 'react';
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
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import './philosophers.scss';
import { PhilosopherCard } from './components/philosopherCard/PhilosopherCard';
import { supabase } from '../../supabaseClient';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../store/reducers/paginationSlice';
import type { AppDispatch, RootState } from '../../store';
// Define the philosopher type based on your Supabase table structure
async function getPhilosophersPage(page: number, pageSize: number = 12) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('Philosophers')
    .select('*', { count: 'exact' })
    .order('id', { ascending: true })
    .range(from, to);

  if (error) throw error;

  return {
    rows: data ?? [],
    total: count ?? 0,
    totalPages: Math.ceil((count ?? 0) / pageSize),
    page,
    pageSize,
  };
}



// Custom hook to fetch philosophers from Supabase
const usePhilosophers = (currentPage: number, cardsPerPage: number) => {
  return useQuery({
    queryKey: ['Philosophers', currentPage],
    queryFn: () => getPhilosophersPage(currentPage, cardsPerPage)
  });
};

const philosophers: React.FC = () => {
  const { t } = useTranslation('philosophers');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEra, setSelectedEra] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector((state: RootState) => state.pagination.currentPage)

  const cardsPerPage = 12;

  // Fetch philosophers from Supabase
  const { data: PhilosophersData, isLoading, error } = usePhilosophers(currentPage, cardsPerPage);

  console.log(PhilosophersData);

  // Calculate total pages based on filtered data




  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPage(page))
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

            Test
          </Typography>
        </Box>
      </Paper>

      {/* Philosopher Cards */}
      {isLoading ? (
        <CircularProgress sx={{ margin: "auto", display: "block" }} />
      ) : error ? (
        <Alert severity="error" sx={{ margin: "2rem auto", display: "block" ,fontSize: "2rem" }}>Error fetching philosophers</Alert>
      ) : (
        <Grid container spacing={3}>
          {PhilosophersData?.rows?.map((philosopher) => (
            <Grid key={philosopher.id} size={{ xs: 12, md: 4 }}>
              <PhilosopherCard philosopher={philosopher} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {PhilosophersData?.totalPages && PhilosophersData?.totalPages > 1 && (
        <Box className="pagination-container">
          <Pagination
            count={PhilosophersData?.totalPages}
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

