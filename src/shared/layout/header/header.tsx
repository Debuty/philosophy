import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
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
import MenuIcon from "@mui/icons-material/Menu";
// @ts-ignore
import { supabase } from '../../../supabaseClient';
import { AppBar, Toolbar, Avatar, IconButton, Typography, Menu, MenuItem, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { AccountCircle, Home, People, Article, Timeline, School, MenuBook, Logout } from "@mui/icons-material";
const Header: React.FC = () => {
  const lang = useSelector((state: RootState) => state.locale.lang);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [session, setSession] = useState<Session | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate();

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
  };
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    navigate(ROUTES.LOGIN);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      console.log('User signed out successfully');
    }
    setSidebarOpen(false)
  }


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const navigationItems = [
    { text: t("nav.home", { ns: "header" }), icon: <Home />, path: ROUTES.HOME },
    { text: t("nav.philosophers", { ns: "header" }), icon: <People />, path: ROUTES.PHILOSOPHERS },
    { text: t("nav.articles", { ns: "header" }), icon: <Article />, path: ROUTES.ARTICLS },
    { text: t("nav.timeline", { ns: "header" }), icon: <Timeline />, path: ROUTES.TIMELINE },
    { text: t("nav.schools", { ns: "header" }), icon: <School />, path: ROUTES.SCHOOLS },
    { text: t("nav.books", { ns: "header" }), icon: <MenuBook />, path: ROUTES.BOOKS },
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
    setSidebarOpen(false)
  }



  return (
    <>

      <div className="header-sm-screen">
        <AppBar position="static" style={{ backgroundColor: "transparent", direction: "ltr" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <div className="header__image-wraper">
                <img src={hederLogo} alt="header__image" className="header__image" />
              </div>
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>


            <div>
              <div style={{ display: "flex", gap: "10px" }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"

                  color="inherit"
                >
                  <AccountCircle />

                </IconButton>

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
                    <LanguageIcon />
                  </Button>
                )}
              </div>
              <Menu
                id="menu-appbar"
                anchorEl={null}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(null)}
                onClose={() => { }}
              >
                <MenuItem onClick={() => { }}>Profile</MenuItem>
                <MenuItem onClick={() => { }}>My account</MenuItem>
              </Menu>
            </div>

          </Toolbar>
        </AppBar>
      </div>
      {/* /////////////////////////////////////////////// */}
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
                <LanguageIcon />
              </Button>
            )}
            <li style={{ display: "flex", gap: "10px" }}>

              {!session ?
                <Link to={ROUTES.LOGIN} style={{ display: "contents" }}>
                  <Button sx={{ fontSize: "1.5rem", backgroundColor: "#534e46" }} variant="contained">
                    {t("login", { ns: "header" })}
                  </Button>
                </Link>
                : <>

                  <Button
                    sx={{ fontSize: "1.5rem", backgroundColor: "#534e46", alignSelf: "center" }}
                    variant="contained"
                    onClick={handleLogout}
                  >
                    {t("logout", { ns: "header" })}
                  </Button>
                  <Avatar onClick={() => navigate(ROUTES.PROFILE)} src={session.user.user_metadata.avatar_url} sx={{ backgroundColor: "#534e46", margin: "auto 1rem", width: "5rem", height: "5rem", cursor: "pointer" }} />
                </>
              }

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

      {/* Sidebar Drawer */}
      <Drawer
        anchor={lang == "ar" ? "left" : "right"}
        open={sidebarOpen}
        onClose={toggleSidebar}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: '#b1aea9',
          },
        }}
      >
        <div style={{ padding: '20px' }}>
          <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            {t("navigation", { ns: "header" })}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <List>
            {navigationItems.map((item, index) => (
              <ListItem
                key={index}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  }
                }}
              >
                <ListItemIcon sx={{ color: '#534e46' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ color: '#333' }}
                />
              </ListItem>
            ))}
            <Divider sx={{ mb: 2 }} />
            <ListItem
              onClick={handleLogout}
              sx={{
                borderRadius: 1,
                mb: 1,
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                }
              }}
            >
              <ListItemIcon sx={{ color: '#534e46' }}><Logout /></ListItemIcon>
              {t("logout", { ns: "header" })}
            </ListItem>

          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
