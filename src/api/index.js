import axios from "axios";
export default axios.create({
  baseURL: `https://calm-spire-14878.herokuapp.com/`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});
