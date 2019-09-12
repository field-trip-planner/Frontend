import React, { useEffect } from "react";
import { setGlobal, useGlobal } from "reactn";

// Calls the function to check if state has been saved to localStorage
// If there is no localStorage Item it calls setGlobal with the default state fields
loadState();

const GlobalState = ({ children }) => {
  const [global, updateGlobal] = useGlobal();

  useEffect(() => {
    // Every time the global state is updated the saveState function is called which takes
    // everything in the state and stores it to localStorage
    saveState(global);
  }, [global]);
  return <>{children}</>;
};
export default GlobalState;

// Serializes the state and stores in localStorage as a string
function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
  }
}

// Parses the serialized state to a json object and then passes it into the setGlobal to make it the default state
// If nothing is saved or the localStorage is cleared upon logout setGlobal is initiated.
function loadState() {
  try {
    setGlobal({ trips: [], user: {} });
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    const state = JSON.parse(serializedState);
    return setGlobal({ ...state });
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
