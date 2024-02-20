import React from "react";
import "./nosotros.css"; // Asegúrate de crear y enlazar tu archivo CSS

const Nosotros = () => {
  return (
    <section className="about-us" id="about">
      <div className="container">
        <h2>Nosotros</h2>
        <p>
          ¡En Nico's Sorteos Potosinos, somos un grupo potosino que ama repartir
          emoción y oportunidades! Desde que abrimos nuestras puertas en 2022,
          hemos estado en la misión de hacer sonreír a la gente y hacer realidad
          sus sueños con nuestros sorteos súper confiables.
        </p>
        <p>
          Nos hemos expandido mucho desde entonces, añadiendo más premios y
          mejorando la experiencia de todos ustedes, nuestros amigos y
          seguidores. Pero lo que más nos llena de orgullo es la comunidad que
          hemos construido juntos. Nos encanta mantenernos cerca de ustedes y
          compartir la emoción de cada sorteo. Así que únete a la diversión en
          Nico's Sorteos Potosinos, ¡donde la suerte y la alegría nunca faltan!
        </p>
        <div className="team-photos">
          {/* Imagina que aquí van las fotos del equipo */}
        </div>
      </div>
    </section>
  );
};

export default Nosotros;
