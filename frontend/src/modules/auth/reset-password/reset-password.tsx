import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Paper, Typography, Alert } from "@mui/material";
import { ROUTES } from "../../../routes/pathes";
import "./reset-password.scss";

/** Password reset is deferred until backend forgot/reset endpoints ship. */
const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");

  return (
    <Paper
      className="reset-password"
      sx={{ p: 3, maxWidth: 600, mx: "auto", backgroundColor: "#afada9" }}
    >
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {t("resetPassword.title", { defaultValue: "Reset Password" })}
      </Typography>
      <Alert severity="info" sx={{ mb: 2, fontSize: "1.2rem" }}>
        Password reset is not available yet. This feature will be enabled when the
        backend endpoints are ready.
      </Alert>
      <Button variant="contained" fullWidth onClick={() => navigate(ROUTES.LOGIN)}>
        Back to Login
      </Button>
    </Paper>
  );
};

export default ResetPassword;
