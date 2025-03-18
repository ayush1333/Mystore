import React from "react";

import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className="d-flex">
        <Sidebar />
        <div className="p-4" style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
