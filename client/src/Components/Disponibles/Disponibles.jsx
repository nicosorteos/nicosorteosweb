// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "../Common/Header/navbar";
import Footer from "../Common/Footer/footer";
import Faqs from "../Common/Faqs/faqs";
import SorteosDisponibles from "./Components/SorteosD Section/sorteosD";
import "./Disponibles.css";

export const Disponibles = () => {
  return (

    <div className="inicio-page">
      <Navbar />
      <SorteosDisponibles />
      {/* <Banner />
        <Nosotros />
        <Products />
       */}

      <Footer />
    </div>

  );
};