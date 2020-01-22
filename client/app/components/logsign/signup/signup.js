import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../login/login.css";
import "./signup.css";
import Formphoto from "../form.js";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";

import { getFromStorage, setInStorage } from "../../../utils/storage.js";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      signUpError: "",
      signInPassword: "",
      signUpFirstName: "",
      signUpLastName: "",
      signUpEmail: "",
      signUpPassword: "",
      signUpConfirmedPassword: "",
      ConfirmPasswordError: "",
      account: "",
      accountError: ""
    };

    this.onSignUp = this.onSignUp.bind(this);
    this.onChangeSignUpEmail = this.onChangeSignUpEmail.bind(this);
    this.onChangeSignUpPassword = this.onChangeSignUpPassword.bind(this);
    this.onChangeSignUpFirstName = this.onChangeSignUpFirstName.bind(this);
    this.onChangeSignUpLastName = this.onChangeSignUpLastName.bind(this);
    this.onChangeSignUpConfirmedPassword = this.onChangeSignUpConfirmedPassword.bind(
      this
    );
    this.onChangeAccountType = this.onChangeAccountType.bind(this);
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

  onSignUp() {
    const {
      signUpPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpError,
      ConfirmPasswordError,
      account,
      accountError
    } = this.state;

    this.setState({
      isLoading: true
    });

    if (this.state.signUpPassword !== this.state.signUpConfirmedPassword) {
      this.setState({
        ConfirmPasswordError: "Error: unproperly confirmed password"
      });
    } else if (!this.refs.speaker.checked && !this.refs.family.checked) {
      this.setState({
        accountError: "Error: choose account type"
      });
    } else {
      fetch("/api/account/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: signUpFirstName,
          lastName: signUpLastName,
          email: signUpEmail,
          password: signUpPassword,
          account: account
        })
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              signUpError: json.message,
              isLoading: false,
              signUpEmail: "",
              signUpPassword: "",
              signUpFirstName: "",
              signUpLastName: ""
            });
          } else {
            this.setState({
              signUpError: json.message,
              isLoading: false
            });
          }
        });
    }
  }

  onChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value
    });
  }
  onChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
  }
  onChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value
    });
  }
  onChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value
    });
  }

  onChangeSignUpConfirmedPassword(event) {
    this.setState({
      signUpConfirmedPassword: event.target.value,
      ConfirmPasswordError: ""
    });
  }

  onChangeAccountType() {
    if (this.refs.speaker.checked) {
      this.setState({
        account: "Speaker",
        accountError: ""
      });
    } else {
      this.setState({
        account: "Host family",
        accountError: ""
      });
    }
  }

  render() {
    const {
      isLoading,
      token,
      signUpError,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpConfirmedPassword,
      ConfirmPasswordError,
      account,
      accountError
    } = this.state;

    if (
      this.state.signUpError === "Signed up" &&
      this.state.ConfirmPasswordError === "" &&
      this.state.accountError === ""
    ) {
      this.setState({
        signUpError: ""
      });
      return (
        <div>
          <Redirect to="/login" />
        </div>
      );
    }

    return (
      <div className="form">
        <div className="login">
          <div className="loginForm">
            <h1 id="pageName">Join us!</h1>
            {signUpError ? <p className="Error">{signUpError}</p> : null}
            {accountError ? <p className="Error">{accountError}</p> : null}
            {ConfirmPasswordError ? (
              <p className="Error">{ConfirmPasswordError}</p>
            ) : null}
            <Form>
              <Form.Group className="FormGroup">
                {signUpFirstName === "" ? (
                  <FontAwesomeIcon className="star" icon={faStarOfLife} />
                ) : null}
                <Form.Control
                  required
                  placeholder="First name"
                  value={this.signUpFirstName}
                  onChange={this.onChangeSignUpFirstName}
                />
              </Form.Group>
              <Form.Group className="FormGroup">
                {signUpLastName === "" ? (
                  <FontAwesomeIcon className="star" icon={faStarOfLife} />
                ) : null}
                <Form.Control
                  placeholder="Last name"
                  value={this.signUpLastName}
                  onChange={this.onChangeSignUpLastName}
                />
              </Form.Group>
              <Form.Group className="FormGroup" controlId="formBasicEmail">
                {signUpEmail === "" ? (
                  <FontAwesomeIcon className="star" icon={faStarOfLife} />
                ) : null}
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={this.signUpEmail}
                  onChange={this.onChangeSignUpEmail}
                />
              </Form.Group>
              <Form.Group className="FormGroup" controlId="formBasicPassword">
                {signUpPassword === "" ? (
                  <FontAwesomeIcon className="star" icon={faStarOfLife} />
                ) : null}
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={this.signUpPassword}
                  onChange={this.onChangeSignUpPassword}
                />
              </Form.Group>
              <Form.Group className="FormGroup" controlId="formBasicPassword">
                {signUpConfirmedPassword === "" ? (
                  <FontAwesomeIcon className="star" icon={faStarOfLife} />
                ) : null}
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={this.signUpConfirmedPassword}
                  onChange={this.onChangeSignUpConfirmedPassword}
                />
              </Form.Group>
              <Form.Group>
                {account === "" ? (
                  <FontAwesomeIcon className="star" icon={faStarOfLife} />
                ) : null}
                <p id="acountForm">Choose account type</p>
                <p>
                  <label className="label">
                    <input
                      name="group1"
                      type="radio"
                      ref="speaker"
                      onClick={this.onChangeAccountType}
                    />
                    <span>Speaker account</span>
                  </label>
                  <label className="label">
                    <input
                      name="group1"
                      type="radio"
                      ref="family"
                      onClick={this.onChangeAccountType}
                    />
                    <span>Family host account</span>
                  </label>
                </p>
              </Form.Group>
              <div id="buttons">
                <div className="butn" onClick={this.onSignUp}>
                  Sign up
                </div>
                <Form.Text className="text-muted">
                  Already have an account?<NavLink to="/login"> Log in</NavLink>
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

export default Signup;
