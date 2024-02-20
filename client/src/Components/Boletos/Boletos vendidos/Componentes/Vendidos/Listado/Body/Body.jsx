import React, {useState,useEffect} from "react";
import "./body.scss";
import TopSApartado from "../../../Top Section/Top"
import ListaVendidos from "./Lista Vendidos/listaVendidos";



const Body = ({ id }) => {
  return (
    <div className="mainContent">
      <TopSApartado />
      <br />
      <ListaVendidos id={id}/>
    </div>
  );
};

export default Body;
