import React, { Component } from "react";
import UserInfo from "../userInfo/userInfo.js";
import Home from "../../Home/Home";
import { Redirect } from "react-router-dom";
import { getFromStorage, setInStorage } from "../../../utils/storage.js";
import "../profile.css";

class UserHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: "",
      firstName: "",
      lastName: "",
      adres: "",
      description: "",
      avatar: 0,
      avatarImg: "",
      friends: [],
      account: ""
    };

    this.logout = this.logout.bind(this);
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
              firstName: json.first,
              lastName: json.last,
              email: json.email,
              phone: json.phone,
              adres: json.adres,
              avatar: json.avatar,
              description: json.description,
              account: json.account,
              isLoading: false
            });
            json.friends.map(item => {
              this.setState(prevState => ({
                friends: [...prevState.friends, item]
              }));
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
    const { isLoading, token, firstName, lastName } = this.state;

    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    if (!token) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <div className="UserHeader">
          <img
            src={"https://api.adorable.io/avatars/" + this.state.avatar}
            className="avatarPhoto"
          />
          <div className="shortInfo">
            <h1>{this.state.firstName + " " + this.state.lastName}</h1>
            <p>{this.state.adres}</p>
          </div>
        </div>
        <UserInfo
          first={this.state.firstName}
          last={this.state.lastName}
          adres={this.state.adres}
          email={this.state.email}
          phone={this.state.phone}
          description={this.state.description}
          account={this.state.account}
          friends={this.state.friends}
        />
      </div>
    );
  }
}

export default UserHeader;
