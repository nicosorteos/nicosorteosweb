// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "../Common/Header/navbar";
import Footer from "../Common/Footer/footer";
import "./Ganadores.css";
import Ganador from "./Components/Ganador/Ganador";

export const Ganadores = () => {
  return (

    <div className="inicio-page">
      <Navbar />
      {/* <Banner />
        <Nosotros />
        <Products />
       */}
      <Ganador />
      <Footer />
    </div>

  );
};