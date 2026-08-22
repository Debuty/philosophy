import React from "react";
import { Button } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import { useLanguageSwitch } from "../hooks/useLanguageSwitch";
import "./LanguageSwitcher.scss";

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = "desktop",
  className = "",
}) => {
  const lang = useSelector((state: RootState) => state.locale.lang);
  const { switchToArabic, switchToEnglish } = useLanguageSwitch();

  const isArabic = lang === "ar";
  const buttonText = isArabic ? "English" : "العربية";
  const handleClick = isArabic ? switchToEnglish : switchToArabic;

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      className={`language-switcher ${variant === "mobile" ? "language-switcher--mobile" : ""} ${className}`.trim()}
    >
      {buttonText}
      <LanguageIcon />
    </Button>
  );
};

export default LanguageSwitcher;
