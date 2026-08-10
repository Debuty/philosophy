import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import type { AuthUser } from '../../../modules/auth/types';
import { PROFILE_CONSTANTS } from '../constants';
import './ProfileHeader.scss';

interface ProfileHeaderProps {
  user: AuthUser;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <Box className="profile__header">
      <Box className="profile__avatar">
        <Avatar
          src={user.avatarUrl ?? undefined}
          sx={{ width: PROFILE_CONSTANTS.AVATAR_SIZE, height: PROFILE_CONSTANTS.AVATAR_SIZE }}
          className="profile__avatar-image"
        />
      </Box>
      <Box className="profile__user-info">
        <Typography variant="h4" component="h1" className="profile__title">
          {user.username} <EditIcon className="profile__edit-icon" />
        </Typography>
        <Typography variant="body1" className="profile__email">
          {user.email}
        </Typography>
        <Box className="profile__edit-button-container">
          <Button variant="contained" className="profile__edit-button">
            Edit Profile
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
