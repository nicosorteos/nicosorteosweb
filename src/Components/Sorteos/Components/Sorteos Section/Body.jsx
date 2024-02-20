import React, {useState,useEffect} from "react";
import "./body.scss";
import TopSorteos from "../Sorteos Section/Top Section/Top";
import SorteosList from "../Sorteos Section/Sorteo/sorteo";
import { IoMdAdd } from "react-icons/io";
import Modal from "./Modal sorteo/modal";
import ModalUpdate from "./Modal Update/modal_update";

const Body = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Nuevo estado para el modal de actualización

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
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
      <TopSorteos />
      <br />
      <div className="buttons">
      <button className="btn flex" onClick={openModal}>
          Nuevo sorteo<IoMdAdd className="icon" />
        </button>
      </div>
      <br />
      {message && <div className="message">{message}</div>}
      <br />
      <SorteosList handleMessage={handleMessage}></SorteosList>
      <Modal isOpen={isModalOpen} onClose={closeModal} /> {/* Renderiza el modal */}
    
    </div>
  );
};

export default Body;
