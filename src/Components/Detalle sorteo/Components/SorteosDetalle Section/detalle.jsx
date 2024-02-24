/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./detalle.css";

const SorteoDetalle = ({ handleMessage }) => {
  const [sorteo, setSorteo] = useState(null);
  const [selectedNumbers, setSelectedNumbers] = useState([]); // Estado para los números seleccionados
  const { idSorteo } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boletos, setBoletos] = useState([]);
  const [inputBoleto, setInputBoleto] = useState('');
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    estado: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Realizar la solicitud GET para obtener los boletos
    axios
      .get(`https://nicosorteos-8b36160039d0.herokuapp.com/listado-boletos/${idSorteo}`)
      .then((response) => {
        console.log(response.data);
        setBoletos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los boletos:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://nicosorteos-8b36160039d0.herokuapp.com/sorteos/${idSorteo}`)
      .then((res) => {
        setSorteo(res.data);
      })
      .catch((err) => {
        console.error(err);
        handleMessage("Error al cargar el sorteo");
      });
  }, [idSorteo, handleMessage]);

  const handleParticiparClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Función para generar un número de boleto aleatorio y disponible
  const elegirBoletoAleatorio = () => {
    let boletoElegido;
    let intentos = 0;
    // Intenta encontrar un boleto aleatorio disponible hasta 1000 veces
    while (!boletoElegido && intentos < 1000) {
      const numeroAleatorio = Math.floor(Math.random() * 60000) + 1;
      if (!boletos.find(boleto => boleto.num_boleto === numeroAleatorio && boleto.estado !== 1)) {
        boletoElegido = numeroAleatorio;
      }
      intentos++;
    }
    if (boletoElegido) {
      setSelectedNumbers([...selectedNumbers, boletoElegido]);
    } else {
      alert("No se pudo encontrar un boleto aleatorio después de 1000 intentos.");
    }
  };

  const buscarBoleto = () => {
    // Asegúrate de que inputBoleto sea un número antes de convertirlo con parseInt
    if (/^\d+$/.test(inputBoleto)) {
      const numeroBoleto = parseInt(inputBoleto, 10);
      if (numeroBoleto >= 1 && numeroBoleto <= 60000) {
        // Verifica si el boleto ya ha sido seleccionado
        if (!selectedNumbers.includes(numeroBoleto)) {
          // Aquí puedes agregar tu lógica para seleccionar el boleto
          setSelectedNumbers(prevSelectedNumbers => [...prevSelectedNumbers, numeroBoleto]);
          setInputBoleto('');
        } else {
          // El boleto ya está seleccionado, maneja este caso según sea necesario
          alert("El boleto ya está seleccionado.");
        }
      } else {
        alert("Número de boleto inválido. Debe ser entre 1 y 60000.");
      }
    } else {
      alert("Boleto valido");
    }
  };

  // Maneja el envío del formulario y prepara el mensaje de WhatsApp
  const handleSubmit = (e) => {
    e.preventDefault();

    selectedNumbers.forEach(async (num_boleto) => {
      try {
        // Realiza una solicitud POST al servidor para apartar el boleto
        await axios.post("https://nicosorteos-8b36160039d0.herokuapp.com/apartar-boletos", {
          id_concurso: idSorteo, // Id del sorteo obtenido de los parámetros de la URL
          num_boleto: num_boleto, // Número de boleto actual del bucle
        });
        console.log(`Boleto ${num_boleto} apartado exitosamente`);
      } catch (error) {
        console.error(`Error al apartar el boleto ${num_boleto}:`, error);
      }
    });
    // Construye el mensaje de WhatsApp
    const whatsappNumber = "4445454450"; // Reemplaza con tu número de WhatsApp
    const message = `Hola, mi nombre es ${formData.nombre}, mi teléfono es ${formData.telefono
      }, soy del estado de ${formData.estado
      }, y quiero apartar los boletos: ${selectedNumbers.join(", ")} para el sorteo "${sorteo.nombre}".`;
    const encodedMessage = encodeURIComponent(message);

    // Abre WhatsApp web o la app de WhatsApp con el mensaje
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );

    // Aquí puedes limpiar el formulario o manejar el estado posterior al envío
    setFormData({ nombre: "", telefono: "", estado: "" });
    setSelectedNumbers([]);
    setIsModalOpen(false);
  };

  const handleBoletoClick = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((num) => num !== number)); // Desmarca el número si ya está seleccionado
    } else {
      setSelectedNumbers([...selectedNumbers, number]); // Agrega el número seleccionado al array
    }
  };

  if (!sorteo) {
    return <div>Cargando sorteo...</div>;
  }

  return (
    <div>
      <br />
      <h3 className="tittle">
        Descubre todos los detalles de este emocionante sorteo y prepárate para
        ser el próximo ganador
      </h3>
      <div className="sorteo-detalle">
        <div className="sorteo-maqueta">
          <div className="sorteo-info">
            <br />
            <br />
            <h3>Sorteo</h3>
            <br />
            <h2>{sorteo.nombre}</h2>
            <br />
            <br />
            <h3>¿De qué se trata?</h3>
            <p>{sorteo.descripcion}</p>
          </div>
          <div className="sorteo-imagen">
            <br />
            <br />
            <br />
            <br />
            <img
              src={sorteo.imagen}
              alt={sorteo.nombre}
            />
          </div>
        </div>
        <br />

        <div className="tooltip-container">
          <button className="info-button">¿Cómo comprar un boleto?</button>
          <span className="tooltip-text">
            Eliges los números de la suerte que deseas y luego das click en
            "Participar". Después, ingresas tu nombre y número de teléfono y
            serás redirigido a WhatsApp, donde un agente se contactará contigo.
          </span>
        </div>


        <div className="titulo-boletos-container">
          <h3>Elige tus boletos de la suerte:</h3>
          {selectedNumbers.length > 0 && (
            <p className="numeros-seleccionados">
              <span className="bold-text">Números seleccionados: </span>
              {selectedNumbers.join(", ")}
            </p>
          )}

          <button type="button" className="boton-aleatorio" onClick={elegirBoletoAleatorio}>
            Máquina de la suerte
          </button>
          <div >
            <form onSubmit={(e) => {
              e.preventDefault();
              buscarBoleto();
            }} className="formulario-busqueda">
         
              <input
                type="text"
                className="input-boleto"
                placeholder="       Ingresa el boleto"
                value={inputBoleto}
                onChange={(e) => setInputBoleto(e.target.value)}
                onKeyDown={(e) => {
                  // Permite solo números y la tecla Enter
                  if (e.key === 'Enter') {
                    buscarBoleto();
                  } else if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              {/* El botón de envío está oculto ya que usamos la tecla Enter para enviar */}
              <button type="submit" style={{ display: 'none' }}>Buscar Boleto</button>
            </form>
          </div>
        </div>

        <div className="boletos-container">
          {Array.from({ length: 60000 }, (_, index) => {
            const estadoBoleto = boletos.find(
              (boleto) => boleto.num_boleto === index + 1
            )?.estado;
            let color;
            if (selectedNumbers.includes(index + 1)) {
              color = "green"; // Boletos seleccionados en verde
            } else if (estadoBoleto === 3) {
              color = "red"; // Boletos vendidos en rojo
            } else if (estadoBoleto === 2) {
              color = "grey"; // Boletos apartados en gris
            } else {
              color = "white"; // Boletos disponibles en blanco
            }

            return (
              <button
                key={index}
                className="boleto"
                style={{ backgroundColor: color }}
                disabled={estadoBoleto === 2 || estadoBoleto === 3} // Deshabilitar si está vendido o apartado
                onClick={() => handleBoletoClick(index + 1)}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        <button onClick={handleParticiparClick}>Apartar boletos</button>

        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-button" onClick={closeModal}>
                &times;
              </span>
              <h2>Formulario de Participación</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                />
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona tu estado</option>
                  <option value="aguascalientes">Aguascalientes</option>
                  <option value="baja_california">Baja California</option>
                  <option value="baja_california_sur">
                    Baja California Sur
                  </option>
                  <option value="campeche">Campeche</option>
                  <option value="chiapas">Chiapas</option>
                  <option value="chihuahua">Chihuahua</option>
                  <option value="cdmx">Ciudad de México</option>
                  <option value="coahuila">Coahuila</option>
                  <option value="colima">Colima</option>
                  <option value="durango">Durango</option>
                  <option value="estado_de_mexico">Estado de México</option>
                  <option value="guanajuato">Guanajuato</option>
                  <option value="guerrero">Guerrero</option>
                  <option value="hidalgo">Hidalgo</option>
                  <option value="jalisco">Jalisco</option>
                  <option value="michoacan">Michoacán</option>
                  <option value="morelos">Morelos</option>
                  <option value="nayarit">Nayarit</option>
                  <option value="nuevo_leon">Nuevo León</option>
                  <option value="oaxaca">Oaxaca</option>
                  <option value="puebla">Puebla</option>
                  <option value="queretaro">Querétaro</option>
                  <option value="quintana_roo">Quintana Roo</option>
                  <option value="san_luis_potosi">San Luis Potosí</option>
                  <option value="sinaloa">Sinaloa</option>
                  <option value="sonora">Sonora</option>
                  <option value="tabasco">Tabasco</option>
                  <option value="tamaulipas">Tamaulipas</option>
                  <option value="tlaxcala">Tlaxcala</option>
                  <option value="veracruz">Veracruz</option>
                  <option value="yucatan">Yucatán</option>
                  <option value="zacatecas">Zacatecas</option>
                </select>

                <p className="disclaimer">
                  ¡Al finalizar serás redirigido a WhatsApp para enviar la
                  información de tu boleto!
                  <br />
                  Tu boleto solo dura 12 horas apartado.
                </p>

                <button type="submit" onClick={handleSubmit}>Enviar</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SorteoDetalle;
