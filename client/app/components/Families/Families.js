import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "whatwg-fetch";
import ScrollAnimation from "react-animate-on-scroll";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer/footer.js";
import "../prof/profile.css";
import "../Speakers/Speakers.css";

import { getFromStorage, setInStorage } from "../../utils/storage.js";

class Families extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      email: "",
      token: "",
      isLoading: "",
      message: ""
    };

    this.addUser = this.addUser.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      fetch("/api/account/profile?token=" + obj.token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: obj.token,
              email: json.email,
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

    fetch("/api/account/families", {
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        json.response.map(item => {
          this.setState(prevState => ({
            users: [...prevState.users, item]
          }));
        });
      })
      .then(res => res.json())
      .then(json => {
        if (!json.success) {
          this.setState({ message: "User is already added" });
          setTimeout(
            function() {
              this.setState({ message: "" });
            }.bind(this),
            1500
          );
        } else {
          this.setState({ message: "User is added" });
          setTimeout(
            function() {
              this.setState({ message: "" });
            }.bind(this),
            1500
          );
        }
      });
  }

  addUser(event) {
    fetch("api/account/edit/addUser", {
      method: "PATCH",
      body: JSON.stringify({
        userEmail: event.target.id,
        email: this.state.email
      }),
      headers: {
        "Content-type": "application/json"
      }
    });
  }

  render() {
    const { users } = this.state;

    return (
      <div>
        <Navbar />
        <div
          className="randomImg"
          style={{
            background: `url(${window.location.origin + "/img/speakers.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom 10%"
          }}
        ></div>
        <h2>List of families</h2>
        <div className="speakers">
          <br />
          {this.state.message ? (
            <div>
              <h5>{this.state.message}</h5>
            </div>
          ) : null}
          {this.state.users.map(item => (
            <div>
              <div className="speaker">
                <div className="head">
                  <img
                    src={"https://api.adorable.io/avatars/" + item.avatar}
                    className="avatarPhoto"
                  />
                </div>
                <div className="speakerInfo">
                  <h3>
                    {item.firstName} {item.lastName}
                  </h3>
                  <br />
                  <br />
                  <p>
                    <b>Email: </b>
                    {item.email}
                  </p>
                  <p>
                    <b>Phone: </b>
                    {item.phone}
                  </p>
                  <p>
                    <b>Description: </b>
                    {item.description}
                  </p>
                </div>
              </div>
              <div
                className="butn speakerbtn"
                id={item.email}
                onClick={this.addUser}
              >
                +
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Families;
