import React from 'react';
import hederLogo from '../../../../assets/heder-logo.png';
import { LanguageSwitcher, NavigationItems, AuthSection } from './index';
import './DesktopHeader.scss';

const DesktopHeader: React.FC = () => {

  return (
    <div className="header">
      <nav className="header__nav">
        <ul className="header__list">
          <li>
            <LanguageSwitcher />
          </li>
          <li className="header__auth-item">
            <AuthSection />
          </li>
          <NavigationItems />
        </ul>
      </nav>
      <div className="header__image-wrapper">
        <img src={hederLogo} alt="header__image" className="header__image" />
      </div>
    </div>
  );
};

export default DesktopHeader;
