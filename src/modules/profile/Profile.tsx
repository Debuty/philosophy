import React from 'react';
import { Grid, Paper } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import Loading from '../../shared/loading/Loading';
import { useUser } from './hooks/useUser';
import { useProfile } from './hooks/useProfile';
import { StatsCard, ProfileHeader, ProfileSidebar } from './components';
import { PROFILE_CONSTANTS, TOAST_PROPS } from './constants';
import { debugLog } from '../../utils/debug';
import './Profile.scss';

const Profile: React.FC = () => {
  const user = useUser();
  const { data: profile, isLoading, error } = useProfile(user);

  if (isLoading) {
    return <Loading message="Loading profile..." />;
  }

  if (error || !profile || !user) {
    return <div>Error loading profile</div>;
  }

  debugLog(profile?.full_name);

  return (
    <div className="profile">
      <Grid container spacing={2} className="profile__grid">
        <Grid size={PROFILE_CONSTANTS.MAIN_SIZE} className="profile__main">
          <Paper elevation={2} className="profile__main-paper">
            <ProfileHeader profile={profile} user={user} />
          </Paper>
          
          <Grid container spacing={2} className="profile__content-grid">
            {PROFILE_CONSTANTS.STATS_CARDS.map(({ key, label }) => (
              <StatsCard
                key={key}
                value={profile[key as keyof typeof profile] || 0}
                label={label}
              />
            ))}
          </Grid>
        </Grid>
        
        <ProfileSidebar />
      </Grid>
      <ToastContainer {...TOAST_PROPS} />
    </div>
  );
};

export default Profile;