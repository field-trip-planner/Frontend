import axios from "axios";
const baseURLvar = process.env.REACT_APP_URL

export default axios.create({
  baseURL: baseURLvar,
  //baseURL: "http://localhost:5000",
  //baseURL: `https://calm-spire-14878.herokuapp.com/`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});
