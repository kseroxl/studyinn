import React from 'react';
import SliderMain from '../layout/slider.js';
import './main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faChild } from '@fortawesome/free-solid-svg-icons'
import { faHourglass } from '@fortawesome/free-solid-svg-icons'
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';
import Photocard from './photoCard/photoCard.js';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer/footer.js';


const card1 = {
    title: "Our Mission",
    text:
      "It has never been so easy before. Do you want to make you kids to grow up in an INNternational envoronment? Do you want to widen their horizons? Or maybe you want to discover Asia and widen yours? No matter on which side you are, we are in one team now, we are here to match the perfect SpeakINN to the perfect Host Family.",
    image: window.location.origin + '/img/photoCard1.jpg'
}

const card2 = {
    title: "Our Goal",
    text:
      "It has never been so easy before. Do you want to make you kids to grow up in an INNternational envoronment? Do you want to widen their horizons? Or maybe you want to discover Asia and widen yours? No matter on which side you are, we are in one team now, we are here to match the perfect SpeakINN to the perfect Host Family.",
    image: window.location.origin + '/img/photoCard2.jpg'
}

const Dashboard = (props) => {
  return (
    <div >
      <ScrollAnimation animateIn="fadeIn">
        <Navbar />
        <SliderMain />
      </ScrollAnimation>
      <div id="cols">
        <ScrollAnimation animateIn="fadeIn">
          <div className = "col">
              <div className="icon">
                <FontAwesomeIcon  icon={faComment} />
              </div>
              <h3>SpeakINN is FUN!</h3>
              <br/>
              <hr className="hrinfo" />
              <p>To jest element tekstowy. Kliknij ten element dwukrotnie aby edytować tekst. Możesz też dowolnie zmieniać rozmiar i położenie tego elementu oraz wszelkie parametry wliczając w to tło, obramowanie i wiele innych.</p>
          </div>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeIn">
          <div className = "col">
              <div className="icon">
                <FontAwesomeIcon  icon={faChild} />
              </div>
              <h3>Make your family INNternational!</h3>
              <hr className="hrinfo" />
              <p>To jest element tekstowy. Kliknij ten element dwukrotnie aby edytować tekst. Możesz też dowolnie zmieniać rozmiar i położenie tego elementu oraz wszelkie parametry wliczając w to tło, obramowanie i wiele innych.</p>
          </div>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeIn">
          <div className = "col">
              <div className="icon">
                <FontAwesomeIcon icon={faHourglass} />
              </div>
              <h3>Once Upon a Time...</h3>
              <br/>
              <hr className="hrinfo" />
              <p>To jest element tekstowy. Kliknij ten element dwukrotnie aby edytować tekst. Możesz też dowolnie zmieniać rozmiar i położenie tego elementu oraz wszelkie parametry wliczając w to tło, obramowanie i wiele innych.</p>
          </div>
          </ScrollAnimation>
      </div>
      <div className="greyCard">
      <ScrollAnimation animateIn="fadeIn">
        <div className="plainInfo">
          <h3>Nagłówek</h3>
          <p>
            To jest element tekstowy. Kliknij ten element dwukrotnie aby edytować tekst. Możesz też dowolnie zmieniać rozmiar i położenie tego elementu oraz wszelkie parametry wliczając w to tło, obramowanie i wiele innych.
          </p>
        </div>
        </ScrollAnimation>
      </div>
      <div className="Onecard">
        <ScrollAnimation animateIn="fadeIn">
              <Photocard item={card1} />
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeIn">
              <Photocard item={card2} />
        </ScrollAnimation>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;