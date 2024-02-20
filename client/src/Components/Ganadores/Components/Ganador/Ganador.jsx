import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Ganador.css'; // Asegúrate de tener este archivo CSS creado con los estilos

const Ganador = ({ handleMessage }) => {
  const [sorteos, setSorteos] = useState([]);
  const navigate = useNavigate(); // Inicializa useNavigate

  //aqui filtras por estado del sorteo en este caso 1 y estado del boleto, en este caso 1
  useEffect(() => {
    axios.get("http://localhost:3002/sorteos")
      .then((res) => {
        const sorteosConEstadoCuatro = res.data
          .filter(sorteo => sorteo.estatus === 4)
          .sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
  
        // Mapeo de sorteos para agregar el campo boletoGanador desde el campo ganador del sorteo
        const sorteosConGanador = sorteosConEstadoCuatro.map(sorteo => {
          return { ...sorteo, boletoGanador: sorteo.ganador || 'No disponible' };
        });
  
        setSorteos(sorteosConGanador);
      })
      .catch((err) => {
        console.error(err);
        handleMessage("Error al cargar los sorteos");
      });
  }, [handleMessage]);
  


  // const handleParticiparClick = (idSorteo) => {
  //   navigate(`/disponibles/${idSorteo}`); // Usa navigate para redirigir
  // };

  return (
    <div className="sorteos-disponibles">
      <h2>Ganadores de cada sorteo</h2>
      <div className="lista-sorteos">
        {sorteos.map((sorteo) => (
          <div key={sorteo.idconcursos} className="product-item">
            <img src={`http://localhost:3002/uploads${sorteo.imagen}`} alt={sorteo.nombre} />
            <h3>{sorteo.nombre}</h3>
            <p className="fecha-creacion">Fecha del sorteo: <strong>{new Date(sorteo.fecha_creacion).toLocaleDateString()}</strong></p>
            <p className="boleto-ganador">Boleto ganador: <strong>{sorteo.boletoGanador || 'No disponible'}</strong></p>

            {/* <p>{sorteo.descripcion}</p> */}
            {/* <button onClick={() => handleParticiparClick(sorteo.idconcursos)}>Participar</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ganador;
