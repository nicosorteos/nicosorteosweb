import React, { useState } from 'react';
import './faqs.css';
// Import icons from a library such as react-icons if available
import { FaWhatsapp, FaFacebookMessenger } from 'react-icons/fa';

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null); // To track the expanded FAQ

  const faqData = [

    {
        question: '¿Cómo puedo comprar un boleto?',
        answer: 'En Nicos Sorteos Potosinos, el proceso de participación es simple y emocionante. Para empezar, visita nuestra plataforma y navega hasta la sección de sorteos, donde encontrarás una variedad de opciones para elegir. Explora los detalles de cada sorteo y elige el que más te guste. Después, selecciona tus números de la suerte y completa el formulario de participación con tus datos personales. Una vez enviado, serás redirigido a WhatsApp, donde nuestro equipo te guiará en el proceso de compra de tus boletos. ¡Con Nicos Sorteos Potosinos, la oportunidad de ganar premios increíbles está a solo unos clics de distancia!'
    },
    {
        question: '¿Cuándo se anuncian los ganadores?',
        answer: 'En Nicos Sorteos Potosinos, la emoción continúa incluso después de que termina el sorteo. Cada uno de nuestros sorteos se basa en los números ganadores de la Lotería Nacional, lo que garantiza un proceso transparente y justo. Una vez que el sorteo ha concluido, los resultados se publicarán en nuestra página web, reflejando los números ganadores seleccionados por la Lotería Nacional. Si eres afortunado y tu combinación coincide con los números ganadores, ¡nuestro equipo se pondrá en contacto contigo directamente! Mantente atento a tu correo electrónico o teléfono, ya que te informaremos sobre tu premio y los pasos a seguir para reclamarlo. En Nicos Sorteos Potosinos, no solo ofrecemos oportunidades de ganar emocionantes premios, sino que también nos aseguramos de brindarte una experiencia confiable y transparente en cada paso del camino.'
    },
    {
        question: '¿Qué métodos de pago aceptan?',
        answer: ' Una vez que hayas iniciado el proceso de apartado de boletos a través de nuestra plataforma, nuestro equipo se pondrá en contacto contigo para recopilar toda la información necesaria para completar tu compra. El pago de los boletos se puede realizar mediante transferencia bancaria o depósitos en tiendas de conveniencia. Para garantizar una experiencia sin contratiempos, te proporcionaremos los detalles de la cuenta bancaria y la información necesaria para realizar el depósito a través de WhatsApp. Estamos comprometidos a brindarte un servicio de calidad y a facilitarte el proceso de compra de tus boletos en Nicos Sorteos Potosinos.'
    },
    {
        question: '¿Cómo se hacen los envíos y a qué países hacen envíos?',
        answer: 'En Nicos Sorteos Potosinos, nos aseguramos de que recibir tus premios sea una experiencia conveniente y segura. Si eres afortunado y te encuentras en San Luis Potosí, nos pondremos de acuerdo contigo para hacer la entrega personalmente, garantizando así que recibas tu premio de manera rápida y directa. En el caso de que residas en otra parte del país, nos comunicaremos contigo para coordinar el envío correspondiente a tu ubicación. Queremos asegurarnos de que disfrutes de tu premio sin complicaciones, por lo que nos encargaremos de todos los detalles logísticos para que tu premio llegue a tus manos de manera segura y oportuna. Es importante destacar que, por el momento, solo es posible participar en nuestros sorteos si te encuentras dentro de México. ¡Gracias por ser parte de la familia de Nicos Sorteos Potosinos!'
    }
];



  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section" id="faqs">
      <h2>Preguntas Frecuentes</h2>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="faq-toggle">
                {activeIndex === index ? '-' : '+'}
              </span>
            </div>
            <div className="faq-answer">
              {activeIndex === index && <p>{faq.answer}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="contact-invitation">
        <h3>¿Aún con dudas?</h3>
        <p>Acercate con nostros vía WhatsApp o por nuestra página de Facebook, será un gusto atenderte y contestar tus dudas.</p>
      </div>

      <div className="contact-buttons">
        <a href="https://wa.me/4445454450" className="whatsapp-button" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp /> Contáctanos por WhatsApp
        </a>
        <a href="https://www.facebook.com/profile.php?id=61555499965336" className="facebook-button" target="_blank" rel="noopener noreferrer">
          <FaFacebookMessenger /> Contáctanos por Facebook
        </a>
      </div>

    </div>
  );
};

export default Faqs;
