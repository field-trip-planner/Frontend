import axios from "axios";

// export default axios.create({
//   baseURL: process.env.REACT_APP_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

export default function() {
  return axios.create({
    baseURL: process.env.REACT_APP_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
