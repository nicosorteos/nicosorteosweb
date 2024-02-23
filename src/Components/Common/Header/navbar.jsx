import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import img from "../Assets/logositio.png";
import './navbar.css';

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/" exact>
          <img src={img} alt="Logo Nico sorteos" />
        </NavLink>
        <span className="navbar-brand">Nico's Sorteos Potosinos</span>
      </div>
      <div className="menu-toggle" onClick={() => setIsNavExpanded(!isNavExpanded)}>
        &#9776;
      </div>
      <div className={`navbar-links ${isNavExpanded ? "active" : ""}`}>
        <NavLink to="/" exact activeClassName="active" onClick={() => setIsNavExpanded(false)}>
          Inicio
        </NavLink>
        <NavLink to="/disponibles" activeClassName="active" onClick={() => setIsNavExpanded(false)}>
          Sorteos
        </NavLink>
        <NavLink to="/ganadores" activeClassName="active" onClick={() => setIsNavExpanded(false)}>
          Ganadores
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
