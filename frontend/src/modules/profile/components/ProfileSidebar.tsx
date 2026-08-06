import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { PROFILE_CONSTANTS } from '../constants';
import './ProfileSidebar.scss';

const ProfileSidebar: React.FC = () => {
  return (
    <Grid size={PROFILE_CONSTANTS.SIDEBAR_SIZE} className="profile__sidebar">
      <Paper elevation={2} className="profile__sidebar-paper">
        <Typography variant="h6" component="h3" gutterBottom className="profile__sidebar-title">
          Sidebar
        </Typography>
        <Typography variant="body2" className="profile__sidebar-description">
          This sidebar takes up 3 columns on medium screens and larger.
        </Typography>
        <Box className="profile__widget">
          <Typography variant="subtitle2" gutterBottom className="profile__widget-title">
            Quick Stats
          </Typography>
          <Box component="ul" className="profile__widget-list">
            <Typography component="li" variant="body2" color="text.secondary" className="profile__widget-item">
              Posts: 0
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary" className="profile__widget-item">
              Comments: 0
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary" className="profile__widget-item">
              Joined: Today
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={2} className="profile__sidebar-paper profile__sidebar-paper--additional">
        <Typography variant="h6" component="h3" gutterBottom className="profile__sidebar-title">
          Additional Info
        </Typography>
        <Typography variant="body2" className="profile__sidebar-description">
          This is another paper component to match the height of the first paper.
        </Typography>
        <Box className="profile__additional-content">
          <Typography variant="subtitle2" gutterBottom className="profile__additional-title">
            More Details
          </Typography>
          <Typography variant="body2" color="text.secondary" className="profile__additional-text">
            Additional content can go here to fill the space and match the height.
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default ProfileSidebar;
