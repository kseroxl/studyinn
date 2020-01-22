import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import ScrollAnimation from "react-animate-on-scroll";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer/footer.js";
import UserHeader from "./userHeader/userHeader.js";
import "./profile.css";

class Profile extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="profilePage">
          <div
            className="randomImg"
            style={{
              background: `url('https://picsum.photos/1920/500') no-repeat`,
              backgroundSize: "cover"
            }}
          ></div>
          <UserHeader />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Profile;
