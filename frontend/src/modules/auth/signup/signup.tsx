import React from "react";
import { useTranslation } from "react-i18next";
import { Grid, Button, Paper, Typography } from "@mui/material";
import { useSignup } from "./hooks/useSignup";
import { FormField } from "./components/FormField";
import { formFields } from "./constants/signupConstants";

const Signup: React.FC = () => {
  const { t } = useTranslation("auth");
  const { form, isLoading, handleSignup } = useSignup();

  const onSubmit = form.handleSubmit(handleSignup);

  return (
    <Paper className="signup" sx={{ p: 3, mx: "auto", backgroundColor: "#afada9" }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ marginBottom: "5rem" }}
      >
        {t("signup.title")}
      </Typography>

      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {formFields.map((field) => (
            <FormField
              key={field.name}
              name={field.name}
              label={t(field.label)}
              type={field.type}
              error={form.formState.errors[field.name]?.message}
              register={form.register}
            />
          ))}

          <Grid size={{ xs: 12, md: 6 }} sx={{ m: "auto" }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {t("signup.submitButton")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Signup;
