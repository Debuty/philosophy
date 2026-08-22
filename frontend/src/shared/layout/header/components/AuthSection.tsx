import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Avatar } from "@mui/material";
import { Login, Logout } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../../../routes/pathes";
import { useAuth } from "../hooks/useAuth";
import "./AuthSection.scss";

interface AuthSectionProps {
  variant?: "desktop" | "mobile";
  onAction?: () => void;
}

const AuthSection: React.FC<AuthSectionProps> = ({
  variant = "desktop",
  onAction,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthenticated, handleLogout } = useAuth();

  const handleLogoutClick = () => {
    handleLogout();
    if (onAction) onAction();
  };

  const handleProfileClick = () => {
    if (user?.id) {
      navigate(`/profile/${user.id}`);
    }
    if (onAction) onAction();
  };

  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN);
    if (onAction) onAction();
  };

  if (!isAuthenticated) {
    if (variant === "mobile") {
      return (
        <div className="auth-section-mobile" onClick={handleLoginClick}>
          <Login className="auth-section-mobile__icon" />
          {t("login", { ns: "header" })}
        </div>
      );
    }

    return (
      <Link to={ROUTES.LOGIN} className="auth-section__link">
        <Button variant="contained" className="auth-section__btn">
          {t("login", { ns: "header" })}
        </Button>
      </Link>
    );
  }

  if (variant === "mobile") {
    return (
      <div className="auth-section-mobile" onClick={handleLogoutClick}>
        <Logout className="auth-section-mobile__icon" />
        {t("logout", { ns: "header" })}
      </div>
    );
  }

  return (
    <div className="auth-section">
      <Button
        variant="contained"
        className="auth-section__btn"
        onClick={handleLogoutClick}
      >
        {t("logout", { ns: "header" })}
      </Button>
      <Avatar
        onClick={handleProfileClick}
        src={user?.avatarUrl ?? undefined}
        className="auth-section__avatar"
      />
    </div>
  );
};

export default AuthSection;
