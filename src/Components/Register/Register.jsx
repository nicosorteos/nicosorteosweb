import React, {useState} from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import axios from "axios";

//Assets import
import video from "../../LoginAssets/2.mp4";
import img from "../../LoginAssets/logositio.png";
import "../../App.scss";

//Icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";



export const Register = () => {
//UseState to hold inputs

const [email, setEmail] = useState('')
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

//Onclik to obtain what the user enter

const createUser = ()=>{
  axios.post('https://nicosorteos-8b36160039d0.herokuapp.com/register',{
    Email: email,
    UserName: username,
    Password: password
  }).then(()=>{
    console.log('User has been created')
  })
}

  return (
    <div className="registerPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className="title">
              ¡Bienvenido al administrador de Nico Sorteos!
            </h2>
            <p>
              "¡Números ganadores, premios potosinos! Tu suerte está en Nicos
              Sorteos Potosinos."
            </p>
          </div>

          <div className="footerDiv flex">
            <span className="text">
              ¿Ya tienes un cuenta?
            </span>
            <Link to={"/login-admin-panel"}>
                <button className="btn">Iniciar sesión</button>
              </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={img} alt="Logo" />
            <h3> ¡Crea una cuenta para poder continuar!</h3>
          </div>

          <form action="" className="form grid">
            <div className="inputDiv">
              <label htmlFor="email">Correo electrónico</label>
              <div className="input flex">
                <MdMarkEmailRead className="icon" />
                <input
                  type="text"
                  id="email"
                  placeholder="Ingresa correo electrónico"
                  onChange={(event) =>{
                    setEmail(event.target.value)
                  }}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="username">Usuario</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Ingresa Usuario"
                  onChange={(event) =>{
                    setUsername(event.target.value)
                  }}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Contraseña</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Ingresa Contraseña"
                  onChange={(event) =>{
                    setPassword(event.target.value)
                  }}
                />
              </div>
            </div>

            <button type="submit" className="btn flex" onClick={createUser}>
              <span>Registrarse</span>
              <AiOutlineSwapRight className="icon" />
            </button>

            <span className="forgotPassword">
              ¿Olvidaste contraseña?
              <a href="">Haz click aquí</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
