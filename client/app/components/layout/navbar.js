import React, { Component } from "react";
import { Link } from "react-router-dom";
import MenuLogOut from "./logout_links";
import MenuLogIn from "./login_links";
import { getFromStorage, setInStorage } from "../../utils/storage.js";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: ""
    };
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
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    const { isLoading, token } = this.state;
    return (
      <nav className="nav">
        <div className="nav-wrapper" id="Menu">
          <div id="logotype">
            <Link to="/" className="left brand-logo black-text" id="logo">
              Speakinn
            </Link>
          </div>
          {token ? <MenuLogIn /> : <MenuLogOut />}
        </div>
        <div id="sliderdiv"></div>
      </nav>
    );
  }
}

export default Navbar;
