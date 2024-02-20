import React, { useState, useEffect } from "react";
import "./lista.scss";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import ModalEstado from "./Modal/modal_estado";

function ListaPendiente({ id, handleMessage }) {
  const [boletos, setBoletos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBoleto, setSelectedBoleto] = useState(null);

  useEffect(() => {
    // Obtener el número de sorteo desde los parámetros de ruta
    const idSorteo = window.location.pathname.split("/")[2]; // Suponiendo que el número de sorteo esté en la tercera posición de la URL

    // Realizar la llamada a la ruta para obtener los boletos
    axios
      .get(`http://localhost:3002/boletos/${idSorteo}`)
      .then((res) => setBoletos(res.data))
      .catch((err) => console.log(err));
  }, []);

  const openModal = (boleto) => {
    setSelectedBoleto(boleto);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      {boletos.length === 0 ? (
        <p>No hay boletos apartados por el momento</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>FOLIO</th>
              <th>CONCURSO</th>
              <th>NÚMERO BOLETO</th>
              <th>ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {boletos.map((boleto) => (
              <tr key={boleto.idboletos}>
                <td>{boleto.idboletos}</td>
                <td>{boleto.id_concursos}</td>
                <td>{boleto.num_boleto}</td>
                <td>
                  <FaRegEdit onClick={() => openModal(boleto)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <ModalEstado
          boleto={selectedBoleto.idboletos}
          handleClose={closeModal}
          handleMessage={handleMessage} 
        />
      )}
    </div>
  );
}

export default ListaPendiente;
