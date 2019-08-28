import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "../src/Components/LandingPage";
import FieldTripList from "./Components/FieldTripList";
import "./App.css";

function App() {
  return (
    <>
      <Route path="/" exact component={LandingPage} />
      <Route exact path="/dashboard" component={FieldTripList} />
    </>
  );
}

export default App;
