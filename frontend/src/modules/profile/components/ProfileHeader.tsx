import React, { useRef } from "react";
import {
  Box,
  Typography,
  // Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { toast } from "react-toastify";
import type { AuthUser } from "../../../modules/auth/types";
import { PROFILE_CONSTANTS } from "../constants";
import { getAvatarFileError, useUpdateAvatar } from "../hooks/useUpdateAvatar";
import "./ProfileHeader.scss";

interface ProfileHeaderProps {
  user: AuthUser;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateAvatar, isPending } = useUpdateAvatar();

  const handlePickImage = () => {
    if (isPending) return;
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const validationError = getAvatarFileError(file);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    updateAvatar(file);
  };

  return (
    <Box className="profile__header">
      <Box className="profile__avatar">
        <Box className="profile__avatar-frame">
          <Avatar
            src={user.avatarUrl ?? undefined}
            sx={{
              width: PROFILE_CONSTANTS.AVATAR_SIZE,
              height: PROFILE_CONSTANTS.AVATAR_SIZE,
              fontSize: "3rem",
            }}
            className="profile__avatar-image"
          >
            {user.username.charAt(0).toUpperCase()}
          </Avatar>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />

          <button
            type="button"
            className="profile__avatar-edit"
            onClick={handlePickImage}
            disabled={isPending}
            aria-label="Change avatar"
            title="Change photo"
          >
            <PhotoCameraIcon />
          </button>

          {isPending ? (
            <Box className="profile__avatar-overlay">
              <CircularProgress size={32} sx={{ color: "#534e46" }} />
            </Box>
          ) : null}
        </Box>
      </Box>

      <Box className="profile__user-info">
        <Typography variant="h4" component="h1" className="profile__title">
          {user.username}
          {/* <EditIcon className="profile__edit-icon" /> */}
        </Typography>
        <Typography variant="body1" className="profile__email">
          {user.email}
        </Typography>
        {/* <Box className="profile__edit-button-container">
          <Button variant="contained" className="profile__edit-button">
            Edit Profile
          </Button>
        </Box> */}
      </Box>
    </Box>
  );
};

export default ProfileHeader;
