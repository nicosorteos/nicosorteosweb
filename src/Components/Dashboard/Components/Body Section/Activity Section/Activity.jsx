import React, { useState, useEffect } from "react";
import "./activity.scss";
import axios from "axios";

//Imported icons
import { BsArrowRightShort } from "react-icons/bs";

//imported images
import img from "../../../Assets/icon.png";

const Activity = () => {
  const [actividadReciente, setActividadReciente] = useState([]);

  useEffect(() => {
    // Llamar a la ruta para obtener los últimos 4 boletos apartados
    axios
      .get("http://localhost:3002/ultimos-boletos-apartados")
      .then((response) => {
        setActividadReciente(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la actividad reciente:", error);
      });
  }, []);

  
  return (
    <div className="activitySection">
      <div className="heading flex">
        <h1>Actividad Reciente</h1>
        <button className="btn flex" style={{ display: "none" }}>
          Ver Todo
          <BsArrowRightShort className="icon" />
        </button>
      </div>

      <div className="secContainer grid">
        {actividadReciente.map((actividad, index) => (
          <div className="singleCustomer flex" key={index}>
            <img src={img} alt="" />
            <div className="customerDetails">
              <span className="name">{actividad.nombre_concurso}</span>
              <small>Se apartó un boleto</small>
            </div>
            <div className="duration">
              Hace un momento
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
