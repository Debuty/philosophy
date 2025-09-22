import React, { useState } from "react";
import { MobileHeader, DesktopHeader, Sidebar } from "./components";
import "./header.scss";
const Header: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <MobileHeader onMenuClick={toggleSidebar} />
      <DesktopHeader />
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
    </>
  );
};

export default Header;
