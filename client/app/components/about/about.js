import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../layout/navbar.js";
import Footer from "../layout/footer/footer.js";
import ScrollAnimation from "react-animate-on-scroll";
import "./about.css";
import "../welcome/main.css";
import SliderMain from "../layout/slider.js";
import MemberList from "./member/memberList.js";

class About extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div id="about">
          <div
            className="backphoto"
            style={{
              background: `url(${window.location.origin + "/img/about.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "bottom 10%"
            }}
          >
            <div className="cardinfo">
              <h3>About us!</h3>
              <hr />
              <p>
                It has never been so easy before. Do you want to make you kids
                to grow up in an INNternational envoronment? Do you want to
                widen their horizons? Or maybe you want to discover Asia and
                widen yours?
              </p>
            </div>
          </div>
          <div className="bottomBorder"></div>
        </div>
        <ScrollAnimation animateIn="fadeIn">
          <div className="about_content">
            <div className="bigTitle">
              <h2>
                <span style={{ color: "#FFD800" }}>Our</span> bene
                <br />
                fits
              </h2>
            </div>
            <div className="benefitList">
              <ul>
                <li>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </li>
                <li>
                  <span>
                    Sed ac augue rhoncus, faucibus nunc quis, pulvinar augue.
                  </span>
                </li>
                <li>
                  <span>
                    Nam eu risus placerat, maximus elit sed, malesuada nulla.
                  </span>
                </li>
                <li>
                  <span>Nulla varius odio convallis iaculis lobortis.</span>
                </li>
                <li>
                  <span>Suspendisse scelerisque quam a posuere accumsan.</span>
                </li>
              </ul>
            </div>
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeIn">
          <div className="team_container">
            <MemberList />
          </div>
        </ScrollAnimation>
        <Footer />
      </div>
    );
  }
}

export default About;
