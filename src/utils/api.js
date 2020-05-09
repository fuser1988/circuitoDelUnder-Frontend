import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:3000/circuito_under/",
  
  responseType: "json" // default
});