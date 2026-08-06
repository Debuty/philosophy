import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/header';
import Footer from './footer/footer';
import './Layout.scss';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
