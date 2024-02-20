import React, { useState, useEffect } from "react";
import "./modal_estado.scss";
import axios from "axios";

function ModalEstado({ boleto, handleClose, handleMessage }) {
  // Aquí puedes implementar la lógica para editar el boleto
  const [nombreSorteo, setNombreSorteo] = useState("");
  const [numBoleto, setNumBoleto] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showCompradorInput, setShowCompradorInput] = useState(false);
  const [comprador, setComprador] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "3") {
      setShowCompradorInput(true);
    } else {
      setShowCompradorInput(false);
    }
  };
  useEffect(() => {
    // Obtener información del boleto al cargar el componente
    axios
      .get(`http://localhost:3002/boletoinfo/${boleto}`)
      .then((res) => {
        const { nombre_concurso, num_boleto } = res.data;
        setNombreSorteo(nombre_concurso);
        setNumBoleto(num_boleto);
      })
      .catch((err) => console.log(err));
  }, [boleto]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (selectedOption === "1") {
      axios
        .delete(`http://localhost:3002/boleto-liberar/${boleto}`)
        .then((res) => {
          handleMessage("¡El boleto ha sido liberado exitosamente!");
          localStorage.setItem(
            "message",
            "¡El boleto ha sido liberado exitosamente!"
          );
          setTimeout(() => {
            handleClose();
            window.location.reload(true); // Recargar la página después de un breve retraso
          }, 1000); // Esperar 1 segundo antes de recargar
        })
        .catch((err) => console.log(err));
    } else if (selectedOption === "3") {
      axios
        .put(`http://localhost:3002/boleto-vendido/${boleto}`, {
          comprador: comprador,
        })
        .then((res) => {
          handleMessage("¡El boleto ha sido vendido exitosamente!");
          localStorage.setItem(
            "message",
            "¡El boleto ha sido vendido exitosamente!"
          );
          setTimeout(() => {
            handleClose();
            window.location.reload(true); // Recargar la página después de un breve retraso
          }, 1000); // Esperar 1 segundo antes de recargar
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="formDiv flex">
          <div className="headerDiv">
            <h3>Selección de boletos</h3>
          </div>

          <form className="form grid" onSubmit={handleFormSubmit}>
            <div className="inputDiv">
              <label htmlFor="username">Nombre del Sorteo</label>
              <div className="input flex">
                <input type="text" id="name" value={nombreSorteo} disabled />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="username">Número de boleto</label>
              <div className="input flex">
                <input type="text" id="name" value={numBoleto} disabled />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="username">Estado del boleto</label>
              <select
                value={selectedOption}
                onChange={handleSelectChange}
                className="input flex"
              >
                <option value="">Seleccione una opción</option>
                <option value="1">Liberar</option>
                <option value="3">Vendido</option>
              </select>
            </div>
            {showCompradorInput && (
              <div className="inputDiv">
                <label htmlFor="comprador">Nombre del Comprador</label>
                <input
                  type="text"
                  id="comprador"
                  value={comprador}
                  onChange={(e) => setComprador(e.target.value)}
                  className="input flex"
                />
              </div>
            )}
            <div className="actions">
              <button onClick={handleClose} className="btn" style={{width:"130px"}}>
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
}

export default ModalEstado;
