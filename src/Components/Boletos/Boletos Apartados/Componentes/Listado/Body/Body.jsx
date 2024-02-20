import React, {useState,useEffect} from "react";
import "./body.scss";
import TopSApartado from "../../Top Section/Top"
import ListaPendiente from "../Lista/lista";


const Body = ({ id }) => {
  const [message, setMessage] = useState(""); // Estado para almacenar el mensaje de la petición
  const handleMessage = (msg) => {
    setMessage(msg);
    // Limpiar el mensaje después de unos segundos
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };
  useEffect(() => {
    // Verificar si hay un mensaje almacenado en el localStorage al cargar la página
    const storedMessage = localStorage.getItem("message");
    if (storedMessage) {
      setMessage(storedMessage);
      // Limpiar el mensaje después de mostrarlo
      localStorage.removeItem("message");
    }
  }, []);
  
  return (
    <div className="mainContent">
      <TopSApartado />
      <br />
      {message && <div className="message">{message}</div>}
      <br />
      <ListaPendiente id={id}  handleMessage={handleMessage}/>
    
    </div>
  );
};

export default Body;
