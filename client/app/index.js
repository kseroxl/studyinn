import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import App from "./components/App/App";

import "./styles/styles.scss";

render(<App />, document.getElementById("root"));
