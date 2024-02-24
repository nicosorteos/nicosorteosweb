import React, { useState } from "react";
import axios from "axios";
import "./modal.scss";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!nombre || !descripcion || !imagen) {
      setErrorMessage("Todos los campos son obligatorios");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", imagen);
      formData.append("upload_preset", "o7yefmcq");

      const secureUrl = await uploadImage(formData);

      const concursoData = {
        Nombre: nombre,
        Descripcion: descripcion,
        Estado: 1,
        url: secureUrl
      };

      await createConcurso(concursoData);

      console.log("Sorteo creado exitosamente");
      onClose();
      window.location.reload(true);

    } catch (error) {
      console.error("Error al crear el sorteo:", error);
      setErrorMessage("Error al crear el sorteo");
    }
  }

  async function uploadImage(formData) {
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dqf4je6lh/image/upload",
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      throw new Error("Error al subir la imagen a Cloudinary",error);
    }
  }

  async function createConcurso(concursoData) {
    try {
      await axios.post("https://nicosorteos-8b36160039d0.herokuapp.com/create", concursoData);
    } catch (error) {
      throw new Error("Error al crear el concurso en el servidor");
    }
  }

  function handleOverlayClick(event) {
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
            <input type="hidden" id="estado" value={1} />
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
                  onChange={handleImageChange}
                />
              </div>
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <br />
            <div className="actions">
              <button
                onClick={onClose}
                className="btn"
                style={{ width: "130px" }}
              >
                Cancelar
              </button>
              <button type="submit" className="btn">
                <span>Crear</span>
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
