import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./logsign.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";

class Formphoto extends Component {
  render() {
    return (
      <div className="formphoto">
        <NavLink to="/" className="h1">
          <FontAwesomeIcon id="arrow" icon={faSortDown} />
          <div className="categoryWrapper">
            <h1 id="HomeButton">SpeakINN</h1>
            <div className="butn">
              <span>
                <span>
                  <span className="hiddenLink">Go to homepage</span>
                </span>
              </span>
            </div>
          </div>
        </NavLink>
      </div>
    );
  }
}

export default Formphoto;
