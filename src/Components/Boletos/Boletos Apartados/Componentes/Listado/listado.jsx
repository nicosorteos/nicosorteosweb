import React from "react";
import { useParams } from "react-router-dom";
import SideBar from "../../../../Dashboard/Components/SideBar Section/Sidebar";
import Body from "../Listado/Body/Body";
import { Navigate } from "react-router-dom";


export const Listado = ({ isAuthenticated, setIsAuthenticated })  => {
  if (isAuthenticated) {
    const { id } = useParams();
    return (
      <div className="dashboard flex">
        <div className="dashboardContainer flex">
        <SideBar
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Body id={id} />
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login-admin-panel" />;
  }
};

export default Listado;
