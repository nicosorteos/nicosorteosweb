import React, { useState, useEffect } from "react";
import "./boletosapartados.scss";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function VendidosList() {
  const [sorteos, setSorteo] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3002/sorteos-boletos-vendidos")
      .then((res) => setSorteo(res.data))
      .catch((err) => console.log(err));
  }, []);


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>FOLIO</th>
            <th>NOMBRE</th>
            <th>TOTAL BOLETOS VENDIDOS</th>
            <th>ACCIÓN</th>
          </tr>
        </thead>
        <tbody>
          {sorteos.map((data, i) => (
            <tr key={data.idSorteo}>
              <td>{data.idSorteo}</td>
              <td>{data.nombreSorteo}</td>
              <td>{data.cantidadBoletosEstado2}</td>
              <td>
               <a href={`/boletovendido/${data.idSorteo}`}> Ver más</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VendidosList;
