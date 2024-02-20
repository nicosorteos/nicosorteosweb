import React from "react";
import SideBar from "../../Dashboard/Components/SideBar Section/Sidebar";
import Body from "./Componentes/Body/Body";
import { Navigate } from "react-router-dom";

export const BoletosVendidos = ({ isAuthenticated, setIsAuthenticated })  => {
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
    console.log("no existe");
    return <Navigate to="/login-admin-panel" />;
  }
};
