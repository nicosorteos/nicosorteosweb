import React, { useState, useEffect } from "react";
import "./sorteo.scss";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import ModalUpdate from "../Modal Update/modal_update";
import { MdDownload } from "react-icons/md";

function SorteosList({ handleMessage }) {
  const [sorteos, setSorteo] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios
      .get("https://nicosorteos-8b36160039d0.herokuapp.com/sorteos")
      .then((res) => setSorteo(res.data))
      .catch((err) => console.log(err));
  }, []);

  const openModal = (id) => {
    setEditId(id); // Establece el id del sorteo a editar
  };

  const closeModal = () => {
    setEditId(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este sorteo?");

    if (confirmDelete) {
      try {
        await axios.delete(`https://nicosorteos-8b36160039d0.herokuapp.com/eliminarsorteo/${id}`);
        handleMessage("Sorteo eliminado correctamente!");
        window.location.reload(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  
  const handleDesactivar = async (id) => {
    const confirmDeactive = window.confirm("¿Estás seguro de que deseas cerrar este sorteo?");
  
    if (confirmDeactive) {
      const ganador = prompt("Por favor ingresa el nombre del ganador:");
  
      if (ganador !== null) { // Comprueba si el usuario ingresó un nombre
        try {
          await axios.put(`https://nicosorteos-8b36160039d0.herokuapp.com/sorteos/${id}/actualizar-estado`, { ganador });
          handleMessage("Sorteo cerrado correctamente!");
          window.location.reload(true);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>FOLIO</th>
            <th>NOMBRE</th>
            <th>IMAGEN</th>
            <th>ESTATUS</th>
            <th>FECHA CREACIÓN</th>
            <th>ACCIÓN</th>
          </tr>
        </thead>
        <tbody>
          {sorteos.map((data, i) => (
            <tr key={data.idconcursos}>
              <td>{data.idconcursos}</td>
              <td>{data.nombre}</td>
              <td>
                <img
                  src={`https://nicosorteos-8b36160039d0.herokuapp.com/uploads${data.imagen}`}
                  alt="Imagen del sorteo"
                  style={{ maxWidth: "100px" }}
                />
              </td>
              <td>
                {data.estatus === 1
                  ? "Activo"
                  : data.estatus === 4
                    ? "Finalizado"
                    : ""}
              </td>
              <td>{data.fecha_creacion}</td>
              <td>
                <FaRegEdit onClick={() => openModal(data.idconcursos)} /> |{" "} {" "}
                <IoTrashOutline onClick={e => handleDelete(data.idconcursos)} /> |{" "} {" "}
                <MdDownload onClick={e => handleDesactivar(data.idconcursos)} /> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editId && (
        <ModalUpdate isOpen={true} onClose={closeModal} editId={editId} />
      )}
    </div>
  );
}

export default SorteosList;
