// eslint-disable-next-line import/no-extraneous-dependencies
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
