import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import type { RootState } from "../../store";
import Loading from "../../shared/loading/Loading";
import { ROUTES } from "../../routes/pathes";
import { PROFILE_CONSTANTS } from "./constants";
import { usePublicProfile } from "./hooks";
import "./Profile.scss";

const UserProfile: React.FC = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const lang = useSelector((state: RootState) => state.locale.lang);
  const { data: profile, isLoading, isError } = usePublicProfile(id);

  if (isLoading) {
    return (
      <Loading
        message={lang === "ar" ? "جاري تحميل الملف الشخصي..." : "Loading profile..."}
      />
    );
  }

  if (isError || !profile) {
    return (
      <div className="profile">
        <Paper elevation={2} className="profile__main-paper" sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            {lang === "ar" ? "الملف الشخصي غير موجود" : "Profile not found"}
          </Typography>
          <Button variant="outlined" onClick={() => navigate(ROUTES.ARTICLS)}>
            {lang === "ar" ? "العودة للمقالات" : "Back to Articles"}
          </Button>
        </Paper>
      </div>
    );
  }

  return (
    <div className="profile">
      <Paper elevation={2} className="profile__main-paper">
        <Box className="profile__header">
          <Box className="profile__avatar">
            <Avatar
              src={profile.avatar_url ?? undefined}
              sx={{
                width: PROFILE_CONSTANTS.AVATAR_SIZE,
                height: PROFILE_CONSTANTS.AVATAR_SIZE,
              }}
              className="profile__avatar-image"
            >
              {profile.username.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
          <Box className="profile__user-info">
            <Typography variant="h4" component="h1" className="profile__title">
              {profile.username}
            </Typography>
            <Typography variant="body1" className="profile__bio">
              {profile.bio?.trim()
                ? profile.bio
                : lang === "ar"
                  ? "لا توجد نبذة بعد."
                  : "No bio yet."}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default UserProfile;
