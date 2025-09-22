import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../../../routes/pathes';
import { NAVIGATION_ITEMS } from '../constants';
import { Home, People, Article, School } from '@mui/icons-material';
import './NavigationItems.scss';

interface NavigationItemsProps {
  variant?: 'desktop' | 'mobile';
  onItemClick?: () => void;
}

const iconMap = {
  home: <Home />,
  philosophers: <People />,
  articles: <Article />,
  schools: <School />,
};

const NavigationItems: React.FC<NavigationItemsProps> = ({ 
  variant = 'desktop', 
  onItemClick 
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleItemClick = (path: string) => {
    navigate(path);
    if (onItemClick) {
      onItemClick();
    }
  };

  if (variant === 'mobile') {
    return (
      <>
        {NAVIGATION_ITEMS.map((item) => (
          <div
            key={item.key}
            className="navigation-item-mobile"
            onClick={() => handleItemClick(ROUTES[item.path as keyof typeof ROUTES])}
          >
            <div className="navigation-item-mobile__icon">
              {iconMap[item.key]}
            </div>
            <div className="navigation-item-mobile__text">
              {t(`nav.${item.key}`, { ns: "header" })}
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {NAVIGATION_ITEMS.map((item) => (
        <li key={item.key} className="header__item">
          <Link 
            to={ROUTES[item.path as keyof typeof ROUTES]} 
            className="header__link"
            onClick={() => handleItemClick(ROUTES[item.path as keyof typeof ROUTES])}
          >
            {t(`nav.${item.key}`, { ns: "header" })}
          </Link>
        </li>
      ))}
    </>
  );
};

export default NavigationItems;
