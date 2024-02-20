import React, { useState, useEffect } from "react";
import "./listing.scss";
import axios from "axios";

//Imported icons

import { BsArrowRightShort } from "react-icons/bs";

//Imported Images
import img from "../../../Assets/190Especial.jpg";

export const Listing = () => {
  const [sorteos, setSorteos] = useState([]);
  const [concursoMasVendido, setConcursoMasVendido] = useState(null);
  const [concursoMasReciente, setConcursoMasReciente] = useState(null);

  useEffect(() => {
    // Obtener los sorteos más recientes
    axios
      .get("http://localhost:3002/sorteos-recientes")
      .then((response) => {
        setSorteos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los sorteos:", error);
      });

    // Obtener el concurso más vendido
    axios
      .get("http://localhost:3002/concurso-mas-vendidos")
      .then((response) => {
        setConcursoMasVendido(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener el concurso más vendido:", error);
      });

    // Obtener el concurso más reciente
    axios
      .get("http://localhost:3002/concurso-mas-reciente")
      .then((response) => {
        setConcursoMasReciente(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener el concurso más reciente:", error);
      });
  }, []);

  return (
    <div className="listingSection">
      <div className="heading flex">
        <h1>Sorteos</h1>
        <a href="/sorteos">
          <button className="btn flex">
            Ver Todo <BsArrowRightShort className="icon" />
          </button>
        </a>
      </div>

      <div className="secContainer flex">
        {sorteos.map((sorteo, index) => (
          <div className="singleItem" key={index}>
            <img
              src={`http://localhost:3002/uploads${sorteo.imagen}`}
              alt="Imagen del sorteo"
              style={{ maxWidth: "100px" }}
            />
            <h3>{sorteo.nombre}</h3>
          </div>
        ))}
      </div>

      <div className="sellers flex">
        <div className="topSellers">
          <div className="heading flex">
            <h3>Más vendido</h3>
          </div>

          {concursoMasVendido && (
            <div className="card flex">
              <div className="users">
                <img
                  src={`http://localhost:3002/uploads${concursoMasVendido.imagen}`}
                  alt="Imagen del concurso más vendido"
                />
              </div>
              <div className="cardText">
                <span>
                  {concursoMasVendido.nombre}
                  <br />
                  <small>
                    {concursoMasVendido.numero_boletos_vendidos} Vendidos{" "}
                    <span className="date">{concursoMasVendido.dias_activos} días</span>
                  </small>
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="featuredSellers">
          <div className="heading flex">
            <h3>Más reciente</h3>
          </div>

          {concursoMasReciente && (
            <div className="card flex">
              <div className="users">
                <img
                  src={`http://localhost:3002/uploads${concursoMasReciente.imagen}`}
                  alt="Imagen del concurso más reciente"
                />
              </div>
              <div className="cardText">
                <span>
                  {concursoMasReciente.nombre}
                  <br />
                  <small>
                    Reciente <span className="date">{concursoMasReciente.dias_activos} días</span>
                  </small>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
