import React, { useState, useEffect } from "react";
import "./modal.scss";
import axios from "axios";

const ModalUpdate = ({ isOpen, onClose, editId }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagenActual, setImagenActual] = useState(""); // Estado para almacenar la URL de la imagen actual

  useEffect(() => {
    if (isOpen && editId) {
      axios
        .get(`https://nicosorteos-8b36160039d0.herokuapp.com/sorteos/${editId}`)
        .then((res) => {
          const sorteo = res.data;
          setNombre(sorteo.nombre);
          setDescripcion(sorteo.descripcion);
          setImagenActual(sorteo.imagen);
        })
        .catch((err) => console.log(err));
    }
  }, [isOpen, editId]);

  async function Update(event) {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", imagen);
      formData.append("upload_preset", "o7yefmcq");
      let imagenUrl = await uploadImage(formData);

      await updateConcurso(editId, nombre, descripcion, imagenUrl);

      console.log("Sorteo actualizado exitosamente");
      onClose();
    } catch (error) {
      console.error("Error al actualizar el sorteo:", error);
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
      throw new Error("Error al subir la imagen a Cloudinary", error);
    }
  }

  async function updateConcurso(id, nombre, descripcion, imagenUrl) {
    
    try {
      const updatedData = {
        Nombre: nombre,
        Descripcion: descripcion,
        Imagen: imagenUrl,
      };
      console.log(updatedData);
      await axios.put(`https://nicosorteos-8b36160039d0.herokuapp.com/update/${id}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      throw new Error("Error al actualizar el concurso en el servidor");
    }
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
            <h3>Editar sorteo</h3>
          </div>

          <form
            onSubmit={Update}
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
                  value={nombre}
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
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Imagen actual</label>
              <div className="flex">
                <img
                  src={imagenActual}
                  alt="Imagen actual del sorteo"
                  style={{ maxWidth: "180px" }}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Cargar nueva Imagen</label>
              <div className="flex">
                <input
                  type="file"
                  id="Imagen"
                  name="Imagen"
                  accept=".jpg, .jpeg, .png"
                  className="flex"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <br />
            <div className="actions">
              <button onClick={onClose} className="btn">
                Cancelar
              </button>
              <button type="submit" className="btn">
                <span>Aceptar</span>
              </button>
            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdate;
