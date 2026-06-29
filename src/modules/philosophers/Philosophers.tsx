import React, { useState } from 'react';
import {
  Grid,
  Pagination,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import './Philosophers.scss';
import { PhilosopherCard } from './components/philosopherCard/PhilosopherCard';
import { FilterBar } from './components/FilterBar/FilterBar';
import { supabase } from '../../supabaseClient';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../store/reducers/paginationSlice';
import type { AppDispatch, RootState } from '../../store';
import { debugLog } from '../../utils/debug';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEra, setSelectedEra] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector((state: RootState) => state.pagination.currentPage)

  const cardsPerPage = 12;

  // Fetch philosophers from Supabase
  const { data: PhilosophersData, isLoading, error } = usePhilosophers(currentPage, cardsPerPage);

  debugLog(PhilosophersData);

  // Calculate total pages based on filtered data




  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPage(page))
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    setSearchTerm('');
    setSelectedEra('');
    setSelectedSchool('');
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="philosophers">
      {/* Filter Bar */}
      <FilterBar
        searchTerm={searchTerm}
        selectedEra={selectedEra}
        selectedSchool={selectedSchool}
        onSearchChange={handleSearchChange}
        onEraChange={handleEraChange}
        onSchoolChange={handleSchoolChange}
        onClearFilters={handleClearFilters}
      />

      {/* Philosopher Cards */}
      {isLoading ? (
        <CircularProgress sx={{ margin: "auto", display: "block" }} />
      ) : error ? (
        <Alert severity="error" sx={{ margin: "2rem auto", display: "block", fontSize: "2rem" }}>Error fetching philosophers</Alert>
      ) : (
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {PhilosophersData?.rows?.map((philosopher) => (
            <Grid key={philosopher.id} size={{ xs: 12, md: 4 }} sx={{ maxWidth: "fit-content" }}>
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

