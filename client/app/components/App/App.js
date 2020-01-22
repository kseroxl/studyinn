import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Dashboard from "../welcome/main.js";
import About from "../about/about.js";
import Login from "../logsign/login/login.js";
import Signup from "../logsign/signup/signup.js";
import Loading from "../loading/loading.js";
import Profile from "../prof/profile2.js";
import Speakers from "../Speakers/Speakers.js";
import Families from "../Families/Families.js";
import Posts from "../Posts/Posts.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    demoAsyncCall().then(() => this.setState({ isLoading: false }));
  }
  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      // if your component doesn't have to wait for async data, remove this block
      return null; // render null when app is not ready
    }

    return (
      <BrowserRouter>
        <div className="App">
          <div className="content">
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/about" component={About} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/loading" component={Loading} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/speakers" component={Speakers} />
            <Route exact path="/families" component={Families} />
            <Route exact path="/posts" component={Posts} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

function demoAsyncCall() {
  return new Promise(resolve => setTimeout(() => resolve(), 2500));
}

export default App;
