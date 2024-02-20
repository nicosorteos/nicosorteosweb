import React, {useState,useEffect} from "react";
import "./body.scss";
import TopSApartado from "../Top Section/Top"
import VendidosList from "../Vendidos/vendidos";


const Body = () => {

  
  return (
    <div className="mainContent">
      <TopSApartado />
      <br />
      <VendidosList/>
    </div>
  );
};

export default Body;
