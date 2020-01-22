import React, { Component } from "react";
import "./member.css";

class Member extends Component {
  render() {
    return (
      <div className="member">
        <div
          className="memberIcon"
          style={{
            background: `url('${this.props.member.image}') no-repeat`,
            backgroundSize: "cover",
            backgroundPosition: "25% 45%"
          }}
        ></div>
        <h3>{this.props.member.name}</h3>
        <p>{this.props.member.description}</p>
      </div>
    );
  }
}

export default Member;
