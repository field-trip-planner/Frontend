import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import GlobalState from "./GlobalState";
import 'semantic-ui-less/semantic.less'

// GlobalState();

const WrappedApp = () => {
  return (
    <GlobalState>
      <App />
    </GlobalState>
  );
};

ReactDOM.render(
  <Router>
    <WrappedApp />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
