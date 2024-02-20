import React, {useState,useEffect} from "react";
import "./top.scss";
import axios from "axios"

//Imported Icons
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdNotificationsNone } from "react-icons/md";
import { BsArrowRightShort } from "react-icons/bs";
import {BsQuestionCircle} from 'react-icons/bs'

//Imported Image

import img from "../../../Assets/icon.png";
import video from "../../../Assets/jackpot-casino.mp4";
import img2 from "../../../Assets/a.png";

const Top = () => {
  const [boletosVendidosHoy, setBoletosVendidosHoy] = useState(0);
  const [boletosVendidosMes, setBoletosVendidosMes] = useState(0);

  useEffect(() => {
    // Obtener la cantidad de boletos vendidos hoy y en todo el mes
    axios
      .get("http://localhost:3002/boletos-vendidos-estadistica")
      .then((response) => {
        setBoletosVendidosHoy(response.data.boletos_vendidos_hoy);
        setBoletosVendidosMes(response.data.boletos_vendidos_mes);
      })
      .catch((error) => {
        console.error("Error al obtener la cantidad de boletos vendidos:", error);
      });
  }, []);

  return (
    <div className="topSection">
      <div className="headerSection flex">
        <div className="tittle">
          <h1 style={{marginRight: '750px'}}>Bienvenido a Nico's Sorteos Potosinos</h1>
          <p>Hola Nico, ¡Bienvenido nuevamente!</p>
        </div>

        <div className="searchBar flex">
          <input type="text" placeholder="Buscar sorteo" />
          <BiSearchAlt className="icon" />
        </div>

        <div className="adminDiv flex">
          <TbMessageCircle className="icon" />
          <MdNotificationsNone className="icon" />
          <div className="adminImage">
            <img src={img} alt="Admin Image" />
          </div>
        </div>
      </div>

      <div className="cardSection flex">
        <div className="rightCard flex">
          <h1>Crea y vende sorteos</h1>
          <p>
            "¡Números ganadores, premios potosinos! Tu suerte está en Nicos
            Sorteos Potosinos."
          </p>

          <div className="buttons flex"  style={{ display: "none" }}>
            <div className="btn">Explorar más</div>
            <div className="btn transparent">Más vendidos</div>
          </div>
          <div className="videoDiv">
            <video src={video} autoPlay loop muted></video>
          </div>
        </div>

        <div className="leftCard flex">
          <div className="main flex">
            <div className="textDiv">
              <h1>Mis Estadísticas</h1>

              <div className="flex">
                <span>
                  Hoy <br />
                  <small>{boletosVendidosHoy} Boletos</small>
                </span>
                <span>
                  Este mes <br />
                  <small>{boletosVendidosMes} Boletos</small>
                </span>
              </div>
             <a href="/boletos-apartados">
             <span className="flex link">
                Ir a boletos apartados <BsArrowRightShort className="icon" />
              </span>
             </a>
            </div>

            <div className="imgDiv">
              <img src={img2} alt="" />
            </div>

            <div className="sideBarCard">
              <BsQuestionCircle className="icon" />
              <div className="cardContent">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <h3>Ayuda</h3>
                <p>Si tiene problemas con su sistema, porfavor contáctenos</p>
                <button className="btn">Ir al centro de ayuda</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
