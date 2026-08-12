import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import type { CommentFormProps } from "../../types/articleDetails";

export const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  value,
  onChange,
  user,
  lang,
  submitLabel,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <form onSubmit={onSubmit}>
        <TextField
          name="comment"
          fullWidth
          multiline
          rows={3}
          placeholder={
            lang === "ar" ? "اكتب تعليقك هنا..." : "Write your comment here..."
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />

        {user ? (
          <Button
            variant="contained"
            type="submit"
            disabled={!value.trim()}
            sx={{
              backgroundColor: "#534e46",
              "&:hover": { backgroundColor: "#2c2820" },
            }}
          >
            {submitLabel ??
              (lang === "ar" ? "إضافة تعليق" : "Add Comment")}
          </Button>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "1.3rem" }}
            >
              {lang === "ar"
                ? "يجب عليك تسجيل الدخول لإضافة تعليق"
                : "You must be logged in to add a comment"}
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              {lang === "ar" ? "تسجيل الدخول" : "Login"}
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
};
