import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes/pathes";
import LanguageIcon from "@mui/icons-material/Language";
import { store, type RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n/i18n";
import { changeLang } from "../../../store/reducers/localeSlice";
import "./header.scss";
import Button from "@mui/material/Button";
import hederLogo from "../../../assets/heder-logo.png";
// @ts-ignore
import { supabase } from '../../../supabaseClient';
const Header: React.FC = () => {
  const lang = useSelector((state: RootState) => state.locale.lang);
  console.log(lang);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const SetLangAr = () => {
    i18n.changeLanguage("ar");
    document.documentElement.setAttribute("lang", "ar");
    document.documentElement.setAttribute("dir", "rtl");
    dispatch(changeLang({ dir: "rtl", lang: "ar" }));
    console.log(store.getState().locale);
  };

  const SetLangEn = () => {
    i18n.changeLanguage("en");
    document.documentElement.setAttribute("lang", "en");
    document.documentElement.setAttribute("dir", "ltr");
    dispatch(changeLang({ dir: "ltr", lang: "en" }));
    console.log(store.getState().locale);
  };

  
  return (
    <div className="header">
      <nav className="header__nav">
        <ul className="header__list">
          {lang == "ar" ? (
            <Button
              variant="contained"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                backgroundColor: "#534e46"
              }}
              onClick={() => SetLangEn()}
            >
              {" "}
              English
              <LanguageIcon />
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "#534e46"
              }}
              onClick={() => SetLangAr()}
            >
              {" "}
              العربية
              <LanguageIcon/>
            </Button>
          )}
          <li>
            {" "}
            <Link to={ROUTES.LOGIN} style={{ display: "contents" }}>
              <Button sx={{ fontSize: "1.5rem", backgroundColor: "#534e46" }} variant="contained">
                {t("login", { ns: "header" })}
              </Button>
            </Link>
          </li>
          <li className="header__item">
            <Link style={{ display: "contents" }} to={ROUTES.HOME}>
              {" "}
              {t("nav.home", { ns: "header" })}
            </Link>
          </li>
          <li className="header__item">
            <Link style={{ display: "contents" }} to={ROUTES.PHILOSOPHERS}>
              {t("nav.philosophers", { ns: "header" })}
            </Link>
          </li>
          <li className="header__item">
            <Link style={{ display: "contents" }} to={ROUTES.ARTICLS}>
              {t("nav.articles", { ns: "header" })}
            </Link>
          </li>
          <li className="header__item">
            <Link style={{ display: "contents" }} to={ROUTES.SCHOOLS}>
              {t("nav.schools", { ns: "header" })}
            </Link>
          </li>
          <li className="header__item">
            <Link style={{ display: "contents" }} to={ROUTES.BOOKS}>
              {t("nav.books", { ns: "header" })}
            </Link>
          </li>
          <li className="header__item">
            <Link to={ROUTES.TIMELINE} style={{ display: "contents" }}>
              {t("nav.timeline", { ns: "header" })}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="header__image-wraper">
        <img src={hederLogo} alt="header__image" className="header__image" />
      </div>
    </div>
  );
};

export default Header;
