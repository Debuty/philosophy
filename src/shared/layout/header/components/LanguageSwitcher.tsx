import React from 'react';
import { Button } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import { useLanguageSwitch } from '../hooks/useLanguageSwitch';
import { HEADER_CONSTANTS } from '../constants';
import './LanguageSwitcher.scss';

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  variant = 'desktop', 
  className = '' 
}) => {
  const lang = useSelector((state: RootState) => state.locale.lang);
  const { switchToArabic, switchToEnglish } = useLanguageSwitch();

  const isArabic = lang === 'ar';
  const buttonText = isArabic ? 'English' : 'العربية';
  const handleClick = isArabic ? switchToEnglish : switchToArabic;

  const buttonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: HEADER_CONSTANTS.SPACING.GAP_SMALL,
    backgroundColor: HEADER_CONSTANTS.COLORS.PRIMARY,
    cursor: 'pointer',
    ...(variant === 'mobile' && { height: HEADER_CONSTANTS.DIMENSIONS.BUTTON_HEIGHT }),
  };

  return (
    <Button
      variant="contained"
      style={buttonStyles}
      onClick={handleClick}
      className={`language-switcher ${className}`}
    >
      {buttonText}
      <LanguageIcon />
    </Button>
  );
};

export default LanguageSwitcher;
