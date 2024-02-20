import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'; // Ensure you have react-icons installed
import './footer.css';

const Footer = () => {
    return (
        <footer className="site-footer" id='contacto'>
            <div className="footer-content">
                {/* <div className="footer-section">
          <h4>Sobre Nosotros</h4>
          <p>Estamos comprometidos a brindar los mejores servicios.</p>
        </div> */}
                <div className="footer-section">
                    <h4>Información de Contacto</h4>
                    <ul className="contact-list">
                        <li>
                            <strong>Correo:</strong>
                            <a href="mailto:nicossorteos@gmail.com"> nicossorteos@gmail.com</a>
                        </li>
                        <li>
                            <strong>Teléfono:</strong>
                            <a href="tel:+524445454450"> 4445454450</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Síguenos</h4>
                    <div className="social-links">

                        <a href="https://www.facebook.com/profile.php?id=61555499965336" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
                        <a href="https://wa.me/4445454450" aria-label="Whatsapp"><FaWhatsapp /></a>
                    </div>
                </div>
            </div>

            <p className="footer-bottom">
                Creado por &nbsp;
                <a
                    href="https://softdone.com.mx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                >
                    Softdone
                </a>
                <span className="footer-year">&nbsp;&copy; {new Date().getFullYear()}</span> &nbsp;Todos los derechos reservados.
            </p>
        </footer>
    );
}

export default Footer;
