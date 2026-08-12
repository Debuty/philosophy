import React from "react";
import { Paper, Typography, Box, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { AuthorSidebarProps } from "../../types/articleDetails";

export const AuthorSidebar: React.FC<AuthorSidebarProps> = ({
  authorProfile,
  article,
  lang,
}) => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={2}
      sx={{ p: 3, backgroundColor: "rgb(174 171 165) !important" }}
    >
      <Typography variant="h6" gutterBottom>
        {lang === "ar" ? "عن الكاتب" : "About the Author"}
      </Typography>

      {authorProfile && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Avatar
            src={authorProfile.avatar_url || undefined}
            sx={{ width: 80, height: 80, mb: 2 }}
          />
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontSize: "1.7rem", fontWeight: "bold" }}
          >
            {authorProfile.username}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, fontSize: "1.3rem" }}
          >
            {authorProfile.bio}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate(`/users/${article.author_id}`)}
            sx={{ border: "none" }}
          >
            {lang === "ar" ? "عرض الملف الشخصي" : "View Profile"}
          </Button>
        </Box>
      )}
    </Paper>
  );
};
