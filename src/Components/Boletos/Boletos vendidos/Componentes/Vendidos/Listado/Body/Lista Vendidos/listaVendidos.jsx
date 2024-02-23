import React, { useState, useEffect } from "react";
import "./lista.scss";
import axios from "axios";

function ListaVendidos({ id }) {
    const [boletos, setBoletos] = useState([]);
  useEffect(() => {
    // Obtener el número de sorteo desde los parámetros de ruta
    const idSorteo = window.location.pathname.split("/")[2]; // Suponiendo que el número de sorteo esté en la tercera posición de la URL

    // Realizar la llamada a la ruta para obtener los boletos
    axios
      .get(`https://nicosorteos-8b36160039d0.herokuapp.com/boletos-vendidos/${idSorteo}`)
      .then((res) => setBoletos(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {boletos.length === 0 ? (
        <p>No hay boletos vendidos por el momento</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>FOLIO</th>
              <th>CONCURSO</th>
              <th>NÚMERO BOLETO</th>
              <th>COMPRADOR</th>
            </tr>
          </thead>
          <tbody>
            {boletos.map((boleto) => (
              <tr key={boleto.idboletos}>
                <td>{boleto.idboletos}</td>
                <td>{boleto.nombre_concurso}</td>
                <td>{boleto.num_boleto}</td>
                <td>{boleto.comprador}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListaVendidos;
