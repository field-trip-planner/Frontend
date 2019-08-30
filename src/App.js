import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "../src/Components/LandingPage";
import FieldTripList from "./Components/FieldTripList";

import FieldTripDetails from "./Components/FieldTrip/FieldTripDetails";
import "./App.css";

function App() {
  return (
    <>
      <Route path="/" exact component={LandingPage} />
      <Route exact path="/dashboard" component={FieldTripList} />
      <Route exact path="/trip/:id" component={FieldTripDetails} />
    </>
  );
}

export default App;
