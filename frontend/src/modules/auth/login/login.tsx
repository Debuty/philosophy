import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  TextField,
  Button,
  Typography,
  InputLabel,
  Paper,
  Link,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import { isApiError } from "../../../api/types";
import { useLogin } from "../hooks/useLogin";
import { ROUTES } from "../../../routes/pathes";
import "./login.scss";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (dataForm: LoginFormData) => {
    loginMutation.mutate(dataForm, {
      onError: (error) => {
        console.error("Error signing in:", error);
        toast.error(isApiError(error) ? error.message : "Login failed");
      },
    });
  };

  return (
    <div className="login-page">
      <Paper
        className="login"
        sx={{ p: 3, backgroundColor: "#afada9" }}
      >
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {t("login.title")}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 12 }}>
            <InputLabel htmlFor="email">{t("login.email")}</InputLabel>
            <TextField
              id="email"
              type="text"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <InputLabel htmlFor="password">{t("login.password")}</InputLabel>
            <TextField
              id="password"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <Link
              component="button"
              type="button"
              variant="body2"
              onClick={() => {
                toast.info("Password reset is not available yet.");
              }}
              sx={{
                textAlign: "right",
                display: "block",
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "1.4rem",
                color: "#534e46",
                "&:hover": {
                  color: "#2c2820",
                },
              }}
            >
              Forgot Password ?
            </Link>
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
              disabled={loginMutation.isPending}
            >
              {t("login.submitButton")}
            </Button>
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => navigate(ROUTES.SIGNUP)}
              sx={{
                "&.MuiButton-root": {
                  backgroundColor: "#989590 !important",
                  color: "#534e46 !important",
                  fontSize: "1.2rem !important",
                  border: "1px solid #534e46 !important",
                },
              }}
            >
              {t("login.signupButton")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
    </div>
  );
};

export default Login;
