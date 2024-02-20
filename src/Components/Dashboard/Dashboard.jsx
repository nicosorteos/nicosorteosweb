import React from "react";
import SideBar from "../Dashboard/Components/SideBar Section/Sidebar";
import Body from "../Dashboard/Components/Body Section/Body";
import { Navigate } from "react-router-dom";

export const Dashboard = ({ isAuthenticated, setIsAuthenticated }) => {
  if (isAuthenticated) {
    return (
      <div className="dashboard flex">
        <div className="dashboardContainer flex">
          <SideBar
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Body />
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login-admin-panel" />;
  }
};
