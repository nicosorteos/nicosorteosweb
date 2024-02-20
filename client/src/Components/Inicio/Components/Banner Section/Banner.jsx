import React, { useState, useEffect } from 'react';
import img from "../../Assets/logositio.png";
import './banner.css';

const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ['Motos', 'Consolas', 'Celulares', 'Efectivo'];
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const period = 1000; // Adjust this value for the complete cycle of the effect

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker); };
    }, [text, delta]);

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(300 - Math.random() * 100);
        } else if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }
    };

    return (
        <section className="banner" id="home">
            <div className="banner-image">
                <img src={img} alt="Banner" />
            </div>
            <div className="banner-content">
                <h2 >¡Se parte de nuestros sorteos mensuales! </h2>
                <h1>  <span className="wrap">{text}</span></h1>
                <p>Compra, participa y gana.</p>
            </div>
        </section>
    );
};

export default Banner;
