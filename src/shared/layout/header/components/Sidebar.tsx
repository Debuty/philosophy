import React from 'react';
import { useSelector } from 'react-redux';
import { Drawer, List, Divider, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../../../store';
import { ROUTES } from '../../../../routes/pathes';
import { HEADER_CONSTANTS } from '../constants';
import { useAuth } from '../hooks/useAuth';
import { LanguageSwitcher, NavigationItems, AuthSection } from './index';
import './Sidebar.scss';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
    const lang = useSelector((state: RootState) => state.locale.lang);
    const navigate = useNavigate();
    const { session } = useAuth();

    const handleProfileClick = () => {
        navigate(ROUTES.PROFILE);
        onClose();
    };

    return (
        <Drawer
            anchor={lang === "ar" ? "right" : "left"}
            open={open}
            onClose={onClose}
            className="sidebar-drawer"
        >
            <div className="sidebar-content">
                <div className="sidebar-header">
                    {session?.user.user_metadata.username && (
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleProfileClick}
                            color="inherit"
                            className="sidebar-profile-button"
                        >
                            <AccountCircle sx={{ fontSize: HEADER_CONSTANTS.DIMENSIONS.ICON_SIZE }} />
                        </IconButton>
                    )}

                    <LanguageSwitcher variant="mobile" className="sidebar-language-switcher" />
                </div>

                <Divider sx={{ mb: 2 }} />

                <List className="sidebar-navigation">
                    <NavigationItems variant="mobile" onItemClick={onClose} />

                    <Divider sx={{ mb: 2 }} />

                    <AuthSection variant="mobile" onAction={onClose} />
                </List>
            </div>
        </Drawer>
    );
};

export default Sidebar;
