import React from 'react';
import { Grid, Paper } from '@mui/material';
import Loading from '../../shared/loading/Loading';
import { useAuthUser } from '../auth/hooks';
import {
  StatsCard,
  ProfileHeader,
  ProfileSidebar,
  BookmarksSection,
} from './components';
import { PROFILE_CONSTANTS } from './constants';
import './Profile.scss';

const Profile: React.FC = () => {
  const { user, isLoading } = useAuthUser();

  if (isLoading) {
    return <Loading message="Loading profile..." />;
  }

  if (!user) {
    return <div>Error loading profile</div>;
  }

  return (
    <div className="profile">
      <Grid container spacing={2} className="profile__grid">
        <Grid size={PROFILE_CONSTANTS.MAIN_SIZE} className="profile__main">
          <Paper elevation={2} className="profile__main-paper">
            <ProfileHeader user={user} />
          </Paper>

          <Grid container spacing={2} className="profile__content-grid">
            {PROFILE_CONSTANTS.STATS_CARDS.map(({ key, label }) => (
              <StatsCard key={key} value={0} label={label} />
            ))}
          </Grid>

          <BookmarksSection enabled={!!user} />
        </Grid>

        <ProfileSidebar />
      </Grid>
    </div>
  );
};

export default Profile;
