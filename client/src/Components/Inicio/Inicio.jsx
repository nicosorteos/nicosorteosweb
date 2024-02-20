// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Navbar from "../Common/Header/navbar";
import Footer from "../Common/Footer/footer";
import Faqs from "../Common/Faqs/faqs";
import Banner from "./Components/Banner Section/Banner";
import Products from "./Components/Products Section/products";
import Nosotros from "./Components/Nosotros Section/Nosotros";
import "./inicio.css";

export const Inicio = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  return (
    <div className="inicio-page">
      <Navbar
        isNavExpanded={isNavExpanded}
        setIsNavExpanded={setIsNavExpanded}
      />
      <Banner id="inicio" />{" "}
      {/* Asegúrate de que cada sección tenga un ID único */}
      <Products id="productos" />
      <Nosotros id="about" />
      <Faqs id="faqs" />
      <Footer id="contacto" />
    </div>
  );
};
