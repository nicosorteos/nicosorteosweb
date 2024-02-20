import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import SideBar from "../../Dashboard/Components/SideBar Section/Sidebar";
import Body from "./Sorteos Section/Body";

export const Sorteos = ({ isAuthenticated, setIsAuthenticated })=> {
  // Verifica si el usuario está autenticado antes de mostrar el contenido de Sorteos
  if (!isAuthenticated) {
    // Si el usuario no está autenticado, redirige al inicio de sesión
    return <Navigate to="/login-admin-panel" />;
  }

  // Si el usuario está autenticado, muestra el contenido de Sorteos
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
};

// Función para recuperar el estado de autenticación desde localStorage
const getAuthStatusFromStorage = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated === "true";
};

// Componente que maneja la persistencia del estado de autenticación
const AuthenticatedSorteos = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    getAuthStatusFromStorage()
  );

  // Actualiza el estado de autenticación en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return <Sorteos isAuthenticated={isAuthenticated} />;
};

export default AuthenticatedSorteos;
