import React, { useState, useEffect } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//Assets import
import video from "../../LoginAssets/2.mp4";
import img from "../../LoginAssets/logositio.png";
import "../../App.scss";

//Icons

import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

export const Login = ({ setIsAuthenticated }) => {
  //Store inputs

  const [loginUserName, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigateTo = useNavigate();

  const [loginStatus, setLoginStatus] = useState("");
  const [statusHolder, setstatusHolder] = useState("message");

  const loginUser = (e) => {
    e.preventDefault();
    axios
      .post("https://nicosorteos-8b36160039d0.herokuapp.com/login", {
        LoginUserName: loginUserName,
        LoginPassword: loginPassword,
      })
      .then((response) => {
        if (response.data.message) {
          navigateTo("/login-admin-panel");
          setLoginStatus('Usuario y contraseña incorrectos')
        } else {
          setIsAuthenticated(true);
          localStorage.setItem('isAuthenticated', true);
          navigateTo("/dashboard");
        }
      });
  };

  useEffect(() => {
    if (loginStatus !== "") {
      setstatusHolder("showMessage");
      setTimeout(() => {
        setstatusHolder("message");
      }, 4000);
    }
  }, [loginStatus]);

  return (
    <div className="loginPage flex">
      <div className="container flex" >
        <div className="videoDiv" style={{ marginLeft: "-28px"}}>
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className="title">
              ¡Bienvenido al administrador de Nico's Sorteos!
            </h2>
            <p>
              "¡Números ganadores, premios potosinos! Tu suerte está en Nico's
              Sorteos Potosinos."
            </p>
          </div>

          <div className="footerDiv flex" style={{ display: "none" }}>
            <span className="text">¿No tienes una cuenta?</span>
            <Link to={"/register-admin-new"}>
              <button className="btn">Registarse</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={img} alt="Logo" />
            <h3> ¡Bienvenido de vuelta!</h3>
          </div>

          <form action="" className="form grid">
            <span className={statusHolder}>{loginStatus}</span>
            <div className="inputDiv">
              <label htmlFor="username">Usuario</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Ingresa Usuario"
                  onChange={(event) => {
                    setLoginUsername(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Contraseña</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Ingresa Contraseña"
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <button type="submit" className="btn flex" onClick={loginUser}>
              <span>Iniciar Sesión</span>
              <AiOutlineSwapRight className="icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
