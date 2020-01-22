import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "whatwg-fetch";
import ScrollAnimation from "react-animate-on-scroll";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer/footer.js";
import "./Posts.css";

import { getFromStorage, setInStorage } from "../../utils/storage.js";

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      title: "",
      topic: "",
      content: "",
      firstName: "",
      lastName: "",
      account: "",
      avatar: "",
      token: "",
      isLoading: "",
      message: ""
    };
    this.addPost = this.addPost.bind(this);
    this.onHandleChangeTitle = this.onHandleChangeTitle.bind(this);
    this.onHandleChangeTopic = this.onHandleChangeTopic.bind(this);
    this.onHandleChangeContent = this.onHandleChangeContent.bind(this);
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
              avatar: json.avatar,
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

    fetch("/api/account/posts", {
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        json.response.map(item => {
          this.setState(prevState => ({
            posts: [...prevState.posts, item]
          }));
        });
      });
  }

  addPost(event) {
    event.preventDefault();
    fetch("/api/account/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        topic: this.state.topic,
        content: this.state.content,
        author: this.state.firstName.concat(" ", this.state.lastName),
        account: this.state.account
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            Error: json.message,
            isLoading: false
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false
          });
        }
      });

    this.setState({
      title: "",
      topic: "",
      content: "",
      message: "Your post is added!"
    });
  }

  onHandleChangeTitle(event) {
    this.setState({
      title: event.target.value,
      message: ""
    });
  }

  onHandleChangeTopic(event) {
    this.setState({
      topic: event.target.value,
      message: ""
    });
  }

  onHandleChangeContent(event) {
    this.setState({
      content: event.target.value,
      message: ""
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <div>
        <Navbar />
        <div
          className="randomImg"
          style={{
            background: `url(${window.location.origin + "/img/posts.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom 10%"
          }}
        ></div>
        <h2>Our news and usefull artickles</h2>
        <div className="postsContainer">
          {this.state.posts.map(item => (
            <div className="post">
              <h4>{item.title}</h4>
              <p>Author : {item.author}</p>
              <small>{item.account}</small>
              <hr />
              <p className="short">{item.topic}</p>
              <br />
              <br />
              <p>{item.content}</p>
            </div>
          ))}
        </div>
        {this.state.message ? (
          <p className="Success">{this.state.message}</p>
        ) : null}
        {this.state.token ? (
          <div className="bg">
            <h1>Add your post</h1>
            <div className="posts">
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={this.state.title}
                  onChange={this.onHandleChangeTitle}
                />
              </div>
              <br />
              <div>
                <label>Topic:</label>
                <input
                  type="text"
                  value={this.state.topic}
                  onChange={this.onHandleChangeTopic}
                />
              </div>
              <br />
              <div>
                <label>Content:</label>
                <input
                  type="text"
                  value={this.state.content}
                  onChange={this.onHandleChangeContent}
                  className="postContent"
                />
              </div>
              <div className="buttonBox">
                <button className="butn" onClick={this.addPost}>
                  Post
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <Footer />
      </div>
    );
  }
}

export default Posts;
