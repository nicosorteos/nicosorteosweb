// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "../Common/Header/navbar";
import Footer from "../Common/Footer/footer";
import Faqs from "../Common/Faqs/faqs";
import SorteoDetalle from "./Components/SorteosDetalle Section/detalle";

import "./DetalleSorteo.css";

export const DetalleSorteo = () => {
  return (

    <div className="inicio-page">
      <Navbar />
      <SorteoDetalle />
      {/* <Banner />
        <Nosotros />
        <Products />
       */}
      <Footer />
    </div>

  );
};