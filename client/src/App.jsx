import React, { useState, useEffect } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Dashboard } from "./Components/Dashboard/Dashboard";
import { Inicio } from "./Components/Inicio/Inicio";
import { Login } from "./Components/Login/Login";
import { Register } from "./Components/Register/Register";
import { Sorteos } from "./Components/Sorteos/Components/Sorteos";
import { BoletosApartados } from "./Components/Boletos/Boletos Apartados/boletosapartados";
import { Listado } from "./Components/Boletos/Boletos Apartados/Componentes/Listado/listado";
import { BoletosVendidos } from "./Components/Boletos/Boletos vendidos/boletosvendidos";
import ListadoVendido from "./Components/Boletos/Boletos vendidos/Componentes/Vendidos/Listado/listadovendido";
import { Disponibles } from "./Components/Disponibles/Disponibles";
import { DetalleSorteo } from "./Components/Detalle sorteo/DetalleSorteo";
import { Ganadores } from "./Components/Ganadores/Ganadores";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/register-admin-new" element={<Register />} />
        <Route
          path="/login-admin-panel"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/disponibles" element={<Disponibles />} />
        <Route path="/disponibles/:idSorteo" element={<DetalleSorteo />} />
        <Route path="/ganadores" element={<Ganadores />} />

        {/* Rutas protegidas que requieren autenticación */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="/sorteos"
          element={<Sorteos isAuthenticated={isAuthenticated}  setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/boletos-apartados"
          element={<BoletosApartados isAuthenticated={isAuthenticated}  setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/boletoapartado/:id"
          element={<Listado isAuthenticated={isAuthenticated}   setIsAuthenticated={setIsAuthenticated}/>}
        />
        <Route
          path="/boletos-vendidos"
          element={<BoletosVendidos isAuthenticated={isAuthenticated}  setIsAuthenticated={setIsAuthenticated}/>}
        />
        <Route
          path="/boletovendido/:id"
          element={<ListadoVendido isAuthenticated={isAuthenticated}   setIsAuthenticated={setIsAuthenticated}/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
