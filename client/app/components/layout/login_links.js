import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getFromStorage, setInStorage } from "../../utils/storage.js";
import "./layout.css";

class MenuLogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      account: "",
      token: ""
    };

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      fetch("/api/account/verify?token=" + obj.token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: obj.token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
      fetch("/api/account/profile?token=" + obj.token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              account: json.account,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  logout() {
    this.setState({
      isLoading: true
    });
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      fetch("/api/account/logout?token=" + obj.token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }
  render() {
    const { isLoading, token } = this.state;
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
          <NavLink className="black-text-link two" to="/posts">
            Posts
          </NavLink>
        </li>
        {this.state.account === "Host family" ? (
          <li>
            <NavLink className="black-text-link six" to="/speakers">
              Speakers
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink className="black-text-link six" to="/families">
              Families
            </NavLink>
          </li>
        )}
        <li>
          <NavLink className="black-text-link six" to="/profile">
            Profile
          </NavLink>
        </li>
        <li>
          <a onClick={this.logout} className="black-text-link six" href="/">
            Log out
          </a>
        </li>
      </ul>
    );
  }
}

export default MenuLogIn;
