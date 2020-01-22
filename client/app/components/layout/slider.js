import React from "react";
import { NavLink } from "react-router-dom";
import "./layout.css";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "./slide-animation.css";
import "./slider_styles.css";

const content = [
  {
    title: "SpeakINN",
    description:
      "It has never been so easy before. Do you want to make you kids to grow up in an INNternational envoronment? Do you want to widen their horizons? Or maybe you want to discover Asia and widen yours? No matter on which side you are, we are in one team now, we are here to match the perfect SpeakINN to the perfect Host Family.",
    button: "Read More",
    image: window.location.origin + "/img/slider1.jpg"
  },
  {
    title: "SpeakINN",
    description:
      "It has never been so easy before. Do you want to make you kids to grow up in an INNternational envoronment? Do you want to widen their horizons? Or maybe you want to discover Asia and widen yours? No matter on which side you are, we are in one team now, we are here to match the perfect SpeakINN to the perfect Host Family.",
    button: "Discover",
    image: window.location.origin + "/img/slider2.jpg"
  },
  {
    title: "SpeakINN",
    description:
      "It has never been so easy before. Do you want to make you kids to grow up in an INNternational envoronment? Do you want to widen their horizons? Or maybe you want to discover Asia and widen yours? No matter on which side you are, we are in one team now, we are here to match the perfect SpeakINN to the perfect Host Family.",
    button: "Join now",
    image: window.location.origin + "/img/slider3.jpg"
  }
];

const SliderMain = () => {
  return (
    <div id="mainSlider">
      <Slider className="slider-wrapper">
        {content.map((item, index) => (
          <div
            key={index}
            className="slider-content"
            style={{ background: `url('${item.image}') no-repeat` }}
          >
            <div className="inner">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <div className="butn">
                <NavLink className="black-text-link two" to="/about">
                  Read me
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderMain;
