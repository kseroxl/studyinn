import React, { Component } from "react";
import "../profile.css";
import "../../Speakers/Speakers.css";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameEditMode: false,
      lastNameEditMode: false,
      adresEditMode: false,
      emailEditMode: false,
      phoneEditMode: false,
      first: props.first,
      last: props.last,
      adres: props.adres,
      email: props.email,
      phone: props.phone,
      description: props.description,
      friends: []
    };
    this.firstNameEdit = this.firstNameEdit.bind(this);
    this.firstNameEditFalse = this.firstNameEditFalse.bind(this);

    this.lastNameEdit = this.lastNameEdit.bind(this);
    this.lastNameEditFalse = this.lastNameEditFalse.bind(this);

    this.emailEdit = this.emailEdit.bind(this);
    this.emailEditFalse = this.emailEditFalse.bind(this);

    this.phoneEdit = this.phoneEdit.bind(this);
    this.phoneEditFalse = this.phoneEditFalse.bind(this);

    this.adresEdit = this.adresEdit.bind(this);
    this.adresEditFalse = this.adresEditFalse.bind(this);

    this.descriptionEdit = this.descriptionEdit.bind(this);
    this.descriptionEditFalse = this.descriptionEditFalse.bind(this);

    this.findUser = this.findUser.bind(this);
  }

  componentDidMount() {
    if (this.props.account === "Host family") {
      fetch("/api/account/speakers", {
        method: "GET"
      })
        .then(res => res.json())
        .then(json => {
          json.response.map(item => {
            this.props.friends.map(friend => {
              if (item.email === friend) {
                this.setState(prevState => ({
                  friends: [...prevState.friends, item]
                }));
              }
            });
          });
        });
    } else if (this.props.account === "Speaker") {
      fetch("/api/account/families", {
        method: "GET"
      })
        .then(res => res.json())
        .then(json => {
          json.response.map(item => {
            this.props.friends.map(friend => {
              if (item.email === friend) {
                this.setState(prevState => ({
                  friends: [...prevState.friends, item]
                }));
              }
            });
          });
        });
    }
  }

  findUser(email) {
    fetch("/api/account/finduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        isDel: false
      })
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState(prevState => ({
          friends: [...prevState.friends, json]
        }));
      });
  }

  firstNameEdit() {
    this.setState({
      firstNameEditMode: true
    });
  }

  firstNameEditFalse() {
    this.setState({
      firstNameEditMode: false,
      first: this.refs.firstName.value
    });
    fetch("api/account/edit/firstName", {
      method: "PATCH",
      body: JSON.stringify({
        firstName: this.refs.firstName.value,
        email: this.state.email
      }),
      headers: {
        "Content-type": "application/json"
      }
    });
  }

  lastNameEdit() {
    this.setState({
      lastNameEditMode: true
    });
  }

  lastNameEditFalse() {
    this.setState({
      lastNameEditMode: false,
      last: this.refs.lastName.value
    });
    fetch("api/account/edit/lastName", {
      method: "PATCH",
      body: JSON.stringify({
        lastName: this.refs.lastName.value,
        email: this.state.email
      }),
      headers: {
        "Content-type": "application/json"
      }
    });
  }

  adresEdit() {
    this.setState({
      adresEditMode: true
    });
  }

  adresEditFalse() {
    this.setState({
      adresEditMode: false,
      adres: this.refs.adres.value
    });
    fetch("api/account/edit/adres", {
      method: "PATCH",
      body: JSON.stringify({
        adres: this.refs.adres.value,
        email: this.state.email
      }),
      headers: {
        "Content-type": "application/json"
      }
    });
  }

  emailEdit() {
    this.setState({
      emailEditMode: true
    });
  }

  emailEditFalse() {
    this.setState({
      emailEditMode: false,
      email: this.refs.email.value
    });
    fetch("api/account/edit/email", {
      method: "PATCH",
      body: JSON.stringify({
        emailNew: this.refs.email.value,
        email: this.state.email
      }),
      headers: {
        "Content-type": "application/json"
      }
    });
  }

  phoneEdit() {
    this.setState({
      phoneEditMode: true
    });
  }

  phoneEditFalse() {
    this.setState({
      phoneEditMode: false,
      phone: this.refs.phone.value
    });
    fetch("api/account/edit/phone", {
      method: "PATCH",
      body: JSON.stringify({
        phone: this.refs.phone.value,
        email: this.state.email
      }),
      headers: {
        "Content-type": "application/json"
      }
    });
  }

  descriptionEdit() {
    this.setState({
      descriptionEditMode: true
    });
  }

  descriptionEditFalse() {
    this.setState({
      descriptionEditMode: false,
      description: this.refs.description.value
    });
    fetch("api/account/edit/description", {
      method: "PATCH",
      body: JSON.stringify({
        description: this.refs.description.value,
        email: this.state.email
      }),
      headers: {
        "Content-type": "application/json"
      }
    });
  }

  render() {
    const {
      firstNameEditMode,
      lastNameEditMode,
      adresEditMode,
      emailEditMode,
      phoneEditMode
    } = this.state;
    const inputStyle = {
      display: "inline",
      width: "auto"
    };
    const buttonStyle = {
      marginLeft: "10px",
      padding: "10px 15px"
    };
    const smallStyle = {
      display: "block",
      margin: "0 auto",
      textAlign: "center"
    };

    return (
      <div>
        <div className="infoHeader">
          <h5>Your {this.props.account} account</h5>
          <small>
            (Double click on the field to edit your personal information)
          </small>
        </div>
        <table>
          <tr>
            <th>First name</th>
            {this.state.firstNameEditMode ? (
              <td>
                <input
                  type="text"
                  defaultValue={this.state.first}
                  ref="firstName"
                  style={inputStyle}
                />
                <div
                  style={buttonStyle}
                  onClick={this.firstNameEditFalse}
                  className="butn"
                >
                  OK
                </div>
              </td>
            ) : (
              <td onDoubleClick={this.firstNameEdit}> {this.state.first} </td>
            )}
          </tr>
          <tr>
            <th>Last name</th>
            {this.state.lastNameEditMode ? (
              <td>
                <input
                  type="text"
                  defaultValue={this.state.last}
                  ref="lastName"
                  style={inputStyle}
                />
                <div
                  style={buttonStyle}
                  onClick={this.lastNameEditFalse}
                  className="butn"
                >
                  OK
                </div>
              </td>
            ) : (
              <td onDoubleClick={this.lastNameEdit}> {this.state.last} </td>
            )}
          </tr>
          <tr>
            <th>Adres</th>
            {this.state.adresEditMode ? (
              <td>
                <input
                  type="text"
                  defaultValue={this.state.adres}
                  ref="adres"
                  style={inputStyle}
                />
                <div
                  style={buttonStyle}
                  onClick={this.adresEditFalse}
                  className="butn"
                >
                  OK
                </div>
              </td>
            ) : (
              <td onDoubleClick={this.adresEdit}> {this.state.adres} </td>
            )}
          </tr>
          <tr>
            <th>E-mail</th>
            {this.state.emailEditMode ? (
              <td>
                <input
                  type="text"
                  defaultValue={this.state.email}
                  ref="email"
                  style={inputStyle}
                />
                <div
                  style={buttonStyle}
                  onClick={this.emailEditFalse}
                  className="butn"
                >
                  OK
                </div>
              </td>
            ) : (
              <td onDoubleClick={this.emailEdit}> {this.state.email} </td>
            )}
          </tr>
          <tr>
            <th>Phone number</th>
            {this.state.phoneEditMode ? (
              <td>
                <input
                  type="text"
                  defaultValue={this.state.phone}
                  ref="phone"
                  style={inputStyle}
                />
                <div
                  style={buttonStyle}
                  onClick={this.phoneEditFalse}
                  className="butn"
                >
                  OK
                </div>
              </td>
            ) : (
              <td onDoubleClick={this.phoneEdit}> {this.state.phone} </td>
            )}
          </tr>
          <tr>
            <th>Account type</th>
            <td>{this.props.account}</td>
          </tr>
          <tr>
            <th>Short description</th>
            {this.state.descriptionEditMode ? (
              <td>
                <input
                  type="text"
                  defaultValue={this.state.description}
                  ref="description"
                  style={inputStyle}
                />
                <div
                  style={buttonStyle}
                  onClick={this.descriptionEditFalse}
                  className="butn"
                >
                  OK
                </div>
              </td>
            ) : (
              <td onDoubleClick={this.descriptionEdit}>
                {" "}
                {this.state.description}{" "}
              </td>
            )}
          </tr>
        </table>
        <div>
          <h1 style={smallStyle}>Your friends</h1>
          {this.props.account !== "Speaker" ? (
            <small style={smallStyle}>
              You can add speakers to your speaker list on "Speaker" page
            </small>
          ) : (
            <small style={smallStyle}>
              You can add families to your families list on "Families" page
            </small>
          )}
          <div className="speakers">
            <br />
            {this.state.friends.map(item => (
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
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
