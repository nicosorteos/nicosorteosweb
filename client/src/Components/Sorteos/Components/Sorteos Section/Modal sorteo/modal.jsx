import React, { useState } from "react";
import "./Modal.scss";
import axios from "axios";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // Estado para almacenar el mensaje de error

  function handleSubmit(event) {
    event.preventDefault();

    // Verificar si todos los campos están llenos
    if (!nombre || !descripcion || !imagen) {
      setErrorMessage("Todos los campos son obligatorios");
      return;
    }

    axios
      .post("http://localhost:3002/create", {
        Nombre: nombre,
        Descripcion: descripcion,
        Estado: 1,
        Imagen: imagen,
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        console.log("Sorteo creado exitosamente");
        onClose(); // Cierra el modal después de enviar el formulario
        window.location.reload(true);
      })
      .catch((error) => {
        console.error("Error al crear el sorteo:", error);
      });
  }

  function handleOverlayClick(event) {
    // Evitar que el modal se cierre si se hace clic dentro del modal
    event.stopPropagation();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    setImagen(file);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={handleOverlayClick}>
        <div className="formDiv flex">
          <div className="headerDiv">
            <h3>Crear nuevo Sorteo</h3>
          </div>

          <form
            onSubmit={handleSubmit}
            className="form grid"
            encType="multipart/form-data"
          >
            <input type="hidden" id="estado" value={1}></input>
            <div className="inputDiv">
              <label htmlFor="username">Nombre del Sorteo</label>
              <div className="input flex">
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Descripción</label>
              <div className="flex">
                <textarea
                  className="textarea input"
                  id="description"
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Imágen</label>
              <div className="flex">
                <input
                  type="file"
                  id="Imagen"
                  name="Imagen"
                  accept=".jpg, .jpeg, .png"
                  multiple
                  className="flex"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <br />
            <div className="actions">
              <button onClick={onClose} className="btn" style={{width:"130px"}}>
                Cancelar
              </button>
              <button type="submit" className="btn">
                <span>Crear </span>
              </button>
            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
