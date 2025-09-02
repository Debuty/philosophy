import React from 'react';
import './PhilosopherDetails.scss';
import { useLocation } from 'react-router-dom';
import { Avatar, Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const PhilosopherDetails: React.FC = () => {
  const { philosopher } = useLocation().state;
  const lang = useSelector((state: RootState) => state.locale.lang);
  console.log(philosopher);
  return (
    <div className="philosopher-details">
      <Grid container spacing={4}>

        <Grid size={{ xs: 12, md: 9 }}>
          <Paper sx={{ padding: "1rem" , backgroundColor: "rgb(174 171 165) !important" }}>
          <div className='philosopher-details-info-container'>
            <Avatar src={philosopher.image} sx={{marginBottom: "1rem"}} />
            <h1>{lang == "ar" ? philosopher.name.ar : philosopher.name.en}</h1>
            <div className='philosopher-details-info'>
              <p className='philosopher-details-info-text'> {lang == "ar" ? philosopher.era.ar : philosopher.era.en}</p>
              <p className='philosopher-details-info-text'> {lang == "ar" ? philosopher.school.ar : philosopher.school.en}</p>
            </div>
            <p className='philosopher-details-info-text-long-article'> {lang == "ar" ? philosopher.longArticle.ar : philosopher.longArticle.en}</p>
          </div>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ padding: "1rem", backgroundColor: "rgb(174 171 165) !important" }}>
            <h1>Quick Facts</h1>
            <p className='quick-facts-item'> Born: {philosopher.birth}</p>
            <p className='quick-facts-item'> Death: {philosopher.death}</p>
            <p className='quick-facts-item'> Nationality: {lang == "ar" ? philosopher.nationality.ar : philosopher.nationality.en}</p>

          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PhilosopherDetails;
