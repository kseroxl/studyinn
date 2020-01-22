import React, { Component } from "react";
import "./member.css";
import Member from "./member.js";

const content = [
  {
    name: "Alice Larson",
    description:
      "It has never been so easy before. Do you want to make you kids to grow up in an INNternational envoronment? ",
    image: window.location.origin + "/img/alice.jpg"
  },
  {
    name: "John Smith",
    description:
      "It has never been so easy before. Do you want to make you kids to grow up in an INNternational envoronment? ",
    image: window.location.origin + "/img/john.jpg"
  },
  {
    name: "Alicja Jankowska",
    description:
      "It has never been so easy before. Do you want to make you kids to grow up in an INNternational envoronment? ",
    image: window.location.origin + "/img/alicja.jpg"
  }
];

class MemberList extends Component {
  render() {
    return (
      <div id="memberList">
        {content.map(member => (
          <Member member={member} />
        ))}
      </div>
    );
  }
}

export default MemberList;
