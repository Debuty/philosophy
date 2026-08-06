import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { PROFILE_CONSTANTS } from '../constants';
import './StatsCard.scss';

interface StatsCardProps {
  value: number;
  label: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  value, 
  label, 
  className = '' 
}) => {
  return (
    <Grid 
      size={PROFILE_CONSTANTS.GRID_SIZES} 
      className={`profile__content-item ${className}`}
    >
      <Paper elevation={1} className="profile__content-paper">
        <Typography variant="h6" className="profile__content-title">
          <span className="profile__stats-value">{value}</span>
          {label}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default StatsCard;
