import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Avatar} from '@mui/material';
import { Login, Logout } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../../../routes/pathes';
import { HEADER_CONSTANTS } from '../constants';
import { useAuth } from '../hooks/useAuth';
import './AuthSection.scss';

interface AuthSectionProps {
  variant?: 'desktop' | 'mobile';
  onAction?: () => void;
}

const AuthSection: React.FC<AuthSectionProps> = ({ 
  variant = 'desktop', 
  onAction 
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { session, handleLogout } = useAuth();

  const handleLogoutClick = () => {
    handleLogout();
    if (onAction) onAction();
  };

  const handleProfileClick = () => {
    navigate(ROUTES.PROFILE);
    if (onAction) onAction();
  };

  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN);
    if (onAction) onAction();
  };

  if (!session) {
    if (variant === 'mobile') {
      return (
        <div className="auth-section-mobile" onClick={handleLoginClick}>
          <Login className="auth-section-mobile__icon" />
          {t("login", { ns: "header" })}
        </div>
      );
    }

    return (
      <Link to={ROUTES.LOGIN} className="auth-section__link">
        <Button 
          sx={{ 
            fontSize: "1.5rem", 
            backgroundColor: HEADER_CONSTANTS.COLORS.PRIMARY 
          }} 
          variant="contained"
        >
          {t("login", { ns: "header" })}
        </Button>
      </Link>
    );
  }

  if (variant === 'mobile') {
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
        sx={{ 
          fontSize: "1.5rem", 
          backgroundColor: HEADER_CONSTANTS.COLORS.PRIMARY, 
          alignSelf: "center" 
        }}
        variant="contained"
        onClick={handleLogoutClick}
      >
        {t("logout", { ns: "header" })}
      </Button>
      <Avatar 
        onClick={handleProfileClick}
        src={session.user.user_metadata.avatar_url} 
        sx={{ 
          backgroundColor: HEADER_CONSTANTS.COLORS.PRIMARY, 
          margin: "auto 1rem", 
          width: HEADER_CONSTANTS.DIMENSIONS.AVATAR_SIZE, 
          height: HEADER_CONSTANTS.DIMENSIONS.AVATAR_SIZE, 
          cursor: "pointer" 
        }} 
      />
    </div>
  );
};

export default AuthSection;
