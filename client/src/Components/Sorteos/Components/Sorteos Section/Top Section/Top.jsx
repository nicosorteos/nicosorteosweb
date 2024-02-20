import React from "react";
import "./top.scss";

//Imported Icons
import { BiSearchAlt } from "react-icons/bi";

//Imported Image

const TopSorteos = () => {
  return (
    <div className="topSection">
      <div className="headerSection flex">
        <div className="tittle">
          <h1>Lista de Sorteos</h1>
        </div>

        <div className="searchBar flex">
          <input type="text" placeholder="Buscar sorteo" />
          <BiSearchAlt className="icon" />
        </div>
      </div>
    </div>
  );
};

export default TopSorteos;
