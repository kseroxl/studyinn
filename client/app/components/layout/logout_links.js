import React from "react";
import { NavLink } from "react-router-dom";
import "./layout.css";

const MenuLogOut = () => {
  return (
    <ul id="nav-login" className="right hide-on-med-and-down">
      <li>
        <NavLink className="black-text-link one" to="/">
          Welcome
        </NavLink>
      </li>
      <li>
        <NavLink className="black-text-link two" to="/about">
          About us
        </NavLink>
      </li>
      <li>
        <NavLink className="black-text-link three" to="/">
          For Speakinners
        </NavLink>
      </li>
      <li>
        <NavLink className="black-text-link four" to="/">
          For Families
        </NavLink>
      </li>
      <li>
        <NavLink className="black-text-link two" to="/posts">
          Posts
        </NavLink>
      </li>
      <li>
        <NavLink className="black-text-link five" to="/login">
          Log in
        </NavLink>
      </li>
      <li>
        <NavLink className="black-text-link six" to="/signup">
          Sign up
        </NavLink>
      </li>
    </ul>
  );
};

export default MenuLogOut;
