import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './sorteosD.css'; // Asegúrate de tener este archivo CSS creado con los estilos

const SorteosDisponibles = ({ handleMessage }) => {
  const [sorteos, setSorteos] = useState([]);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    axios
      .get("https://nicosorteos-8b36160039d0.herokuapp.com/sorteos")
      .then((res) => {
        const sorteosActivos = res.data.filter(sorteo => sorteo.estatus === 1);
        setSorteos(sorteosActivos);
      })
      .catch((err) => {
        console.error(err);
        handleMessage("Error al cargar los sorteos");
      });
  }, [handleMessage]);

  const handleParticiparClick = (idSorteo) => {
    navigate(`/disponibles/${idSorteo}`); // Usa navigate para redirigir
  };

  return (
    <div className="sorteos-disponibles">
      <h2>Sorteos Disponibles</h2>
      <div className="sorteos-grid">
        {sorteos.map((sorteo, index) => (
          <div key={sorteo.idconcursos} className={`sorteo-item${index % 3 === 2 ? ' last-in-row' : ''}`}>
            <img src={sorteo.imagen} alt={sorteo.nombre} />
            <h3>{sorteo.nombre}</h3>
            <button onClick={() => handleParticiparClick(sorteo.idconcursos)}>Participar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SorteosDisponibles;
