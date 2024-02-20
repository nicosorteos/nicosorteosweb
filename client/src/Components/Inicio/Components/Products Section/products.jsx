import React from "react";
import "./products.css"; // Make sure to create and link your CSS file
import img from "../../Assets/moto.jpg";
import img2 from "../../Assets/consola.png";
import img3 from "../../Assets/cel.jpg";
import img4 from "../../Assets/cel.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const NextArrow = ({ onClick }) => (
  <div className="slick-arrow slick-next" onClick={onClick}>
    <FaChevronRight />
  </div>
);

// eslint-disable-next-line react/prop-types
const PrevArrow = ({ onClick }) => (
  <div className="slick-arrow slick-prev" onClick={onClick}>
    <FaChevronLeft />
  </div>
);

const Products = () => {
  const navigate = useNavigate(); // Inicializa useNavigate

  // Función para manejar la redirección
  const goToDisponibles = () => {
    navigate("/disponibles");
  };

  // Settings for the slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="line">
      <div className="product-carousel-section">
      <h2>
        {" "}
        "¡Números ganadores, premios potosinos! Tu suerte está en Nico's Sorteos
        Potosinos."
      </h2>

      <h4>
        {" "}
        "¡Prepárate para ganar en grande con Nico's Sorteos Potosinos! Desde
        motos y consolas hasta televisores y más, tenemos una amplia gama de
        premios esperando por ti. ¡Tu suerte está a punto de cambiar! ¡Ven y
        descubre cómo puedes convertirte en el próximo ganador!"
      </h4>
      <Slider {...settings}>
        <div className="product-item">
          <img src={img} alt="Motos" />
          <h3>Motocicletas</h3>
          <p>
            ¿Listo para sentir la emoción de la carretera? En Nico's Sorteos
            Potosinos, tenemos las mejores motos esperando por ti. Desde
            elegantes deportivas hasta poderosas cruisers, nuestras motocicletas
            son tu pasaporte hacia la aventura. ¡No pierdas la oportunidad de
            acelerar hacia tus sueños! ¡Participa ahora y deja que la suerte te
            lleve al camino de la libertad sobre dos ruedas!
          </p>
        </div>
        <div className="product-item">
          <img src={img2} alt="Consolas" />
          <h3>Consolas</h3>
          <p>
            Sumérgete en la emoción de los videojuegos con las consolas de
            Nico's Sorteos Potosinos. Desde emocionantes aventuras hasta
            competiciones frenéticas, nuestras consolas te ofrecen la mejor
            experiencia de juego. ¡Participa ahora y deja que la suerte te lleve
            al siguiente nivel del entretenimiento digital!
          </p>
        </div>
        <div className="product-item">
          <img src={img3} alt="Móviles" />
          <h3>Celulares</h3>
          <p>
            ¡Hazte con lo último en tecnología móvil en Nico's Sorteos
            Potosinos! Desde smartphones de alta gama hasta modelos innovadores,
            nuestras opciones te mantendrán conectado y en movimiento.
            ¡Participa ya y deja que la suerte te sorprenda con el dispositivo
            de tus sueños!
          </p>
        </div>
        <div className="product-item">
          <img src={img4} alt="accesorios" />
          <h3>Accesorios</h3>
          <p>
            Potencia tu experiencia auditiva con los accesorios de Nico's
            Sorteos Potosinos. Desde AirPods hasta potentes bocinas, nuestra
            selección te ofrece lo mejor en calidad de sonido y comodidad.
            ¡Sintoniza tu suerte con nosotros y lleva tu música a otro nivel!
          </p>
        </div>
      </Slider>
      <div className="carousel-button-container">
        <button className="view-raffles-button" onClick={goToDisponibles}>
          ¡Quiero participar!
        </button>
      </div>
      </div>
    </section>
  );
};

export default Products;
