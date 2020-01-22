import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./login.css";
import Formphoto from "../form.js";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import { getFromStorage, setInStorage } from "../../../utils/storage.js";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      signInError: "",
      signInError: "",
      signInEmail: "",
      signInPassword: ""
    };

    this.onSignIn = this.onSignIn.bind(this);
    this.onChangeSignInEmail = this.onChangeSignInEmail.bind(this);
    this.onChangeSignInPassword = this.onChangeSignInPassword.bind(this);
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

  onChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value
    });
  }
  onChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }

  onSignIn() {
    const { signInPassword, signInEmail, signInError } = this.state;

    this.setState({
      isLoading: true
    });

    fetch("/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setInStorage("the_main_app", { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail: "",
            signInPassword: "",
            token: json.token
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false
          });
        }
      });
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword
    } = this.state;

    if (this.state.signInError === "Logged in") {
      this.setState({
        signInError: ""
      });
      return (
        <div>
          <Redirect to="/profile" />
        </div>
      );
    }

    return (
      <div className="form">
        <div className="login">
          <div className="loginForm">
            <h1>Greate to see you again!</h1>
            {signInError ? <p className="Error">{signInError}</p> : null}
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={this.signInEmail}
                  onChange={this.onChangeSignInEmail}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={this.signInPassword}
                  onChange={this.onChangeSignInPassword}
                />
              </Form.Group>
              <div id="buttons">
                <div className="butn" onClick={this.onSignIn}>
                  Log in
                </div>
                <Form.Text className="text-muted">
                  Don't have an account?
                  <NavLink to="/signup"> Sign up</NavLink>
                </Form.Text>
              </div>
            </Form>
          </div>
        </div>
        <Formphoto />
      </div>
    );
  }
}

export default Login;
