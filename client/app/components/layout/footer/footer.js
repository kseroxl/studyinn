import React from 'react';
import './footer.css';
import ScrollAnimation from 'react-animate-on-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = (props) => {
    return (   
        <ScrollAnimation animateIn="fadeIn">     
        <footer>
          <div className="container">
          <div className="Onerow">
                <div className="Onecol s3">
                    <h6>W kilku słowach o tym co robimy</h6>
                    <p>Możesz też dowolnie zmieniać rozmiar i położenie tego elementu oraz wszelkie parametry wliczając w to tło, obramowanie i wiele innych.</p>
                </div>
                <div className="Onecol s3">
                    <h6>Media Społecznościowe</h6>
                    <br/>
                    <ul className="iconsFoo">
                        <FontAwesomeIcon  id="f" href="/" className="iconFoo" icon={faFacebook} />
                        <FontAwesomeIcon  id="t" href="/" className="iconFoo" icon={faTwitter} />
                        <FontAwesomeIcon  id="i" href="/" className="iconFoo" icon={faInstagram} />
                        <FontAwesomeIcon  id="l" href="/" className="iconFoo" icon={faLinkedin} />
                        <FontAwesomeIcon  id="y" href="/" className="iconFoo" icon={faYoutube} />
                    </ul>
                </div>
                <div className="Onecol s3">
                    <h6 >Przydatne informacje</h6>
                    <p>Możesz też dowolnie zmieniać rozmiar i położenie tego elementu oraz wszelkie parametry wliczając w to tło, obramowanie i wiele innych.</p>
                </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2014 Copyright Text
            <a className="right linkFoo" href="#!">More Links</a>
            </div>
          </div>
        </footer>
        </ScrollAnimation>
    )
}

export default Footer;