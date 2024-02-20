import React from "react";
import "./sidebar.scss";

//Imported Images
import logo from "../../Assets/logositio.jpg";

//Imported Icons

import { IoMdSpeedometer } from "react-icons/io";
import { MdDeliveryDining } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { BsTrophy } from "react-icons/bs";
import { AiOutlinePieChart } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { BsCreditCard2Front } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";
import { IoMdReturnLeft } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom"; 

const Sidebar = ({ setIsAuthenticated })=> {

  const navigate = useNavigate(); // Obtén la función de navegación

  const handleLogout = () => {
    // Lógica para cerrar sesión
    setIsAuthenticated(false); // Actualiza el estado a false
    localStorage.removeItem("isAuthenticated"); // Remueve el estado de autenticación del localStorage
    navigate("/login-admin-panel"); // Redirige al inicio de sesión
  };

  return (
    <div className="sideBar grid">
      <div className="logoDiv flex">
        <img src={logo} alt="" />
        <h2>Nico's Sorteos Potosinos</h2>
      </div>

      <div className="menuDiv">
        <h3 className="divTittle">MENÚ RÁPIDO</h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <Link to="/dashboard" className="menuLink flex">
              <IoMdSpeedometer className="icon" />
              <span className="smallText">Tablero</span>
            </Link>
          </li>
          <li className="listItem">
            <Link to="/sorteos" className="menuLink flex">
              <BsTrophy className="icon" />
              <span className="smallText">Sorteos</span>
            </Link>
          </li>
          <li className="listItem">
            <Link to="/boletos-apartados" className="menuLink flex">
              <MdDeliveryDining className="icon" />
              <span className="smallText">Boletos Apartados</span>
            </Link>
          </li>
          <li className="listItem">
            <Link to="/boletos-vendidos" className="menuLink flex">
              <MdOutlineExplore className="icon" />
              <span className="smallText">Boletos Vendidos</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="settingsDiv" style={{ display: "none" }}>
        <h3 className="divTittle">CONFIGURACIÓN</h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <a href="#" className="menuLink flex">
              <AiOutlinePieChart className="icon" />
              <span className="smallText">Estadísticas</span>
            </a>
          </li>
          <li className="listItem">
            <a href="#" className="menuLink flex">
              <BiTrendingUp className="icon" />
              <span className="smallText">Tendencias</span>
            </a>
          </li>
          <li className="listItem">
            <a href="#" className="menuLink flex">
              <MdOutlinePermContactCalendar className="icon" />
              <span className="smallText">Contactos</span>
            </a>
          </li>
          <li className="listItem">
            <a href="#" className="menuLink flex">
              <BsCreditCard2Front className="icon" />
              <span className="smallText">Facturas</span>
            </a>
          </li>
        </ul>
      </div>
      <button className="btn flex" onClick={handleLogout} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '15px' }}>
        <span>Cerrar sesión</span>
        <IoMdReturnLeft className="icon" />
      </button>
      <div className="sideBarCard">
        <BsQuestionCircle className="icon" />
        <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <h3>Ayuda</h3>
          <p>Si tiene problemas con su sistema, porfavor contáctenos</p>
          <a
            href="https://softdone.com.mx/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn">Ir al centro de ayuda</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
