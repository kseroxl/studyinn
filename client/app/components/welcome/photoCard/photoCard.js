import React from "react";
import { NavLink } from "react-router-dom";
import "./photoCard.css";

const Photocard = props => {
  return (
    <div className="wholeCard">
      <div
        className="photo"
        style={{ backgroundImage: `url(${props.item.image})` }}
      ></div>
      <div className="description">
        <h4>{props.item.title}</h4>
        <hr />
        <p>{props.item.text}</p>
        <div className="butn">
          <NavLink className="black-text-link two" to="/about">
            Read me
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Photocard;
