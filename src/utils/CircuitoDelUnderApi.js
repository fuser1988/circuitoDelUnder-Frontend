import axios from "axios";

export default axios.create({
  baseURL: "https://circuito-del-under-backend.herokuapp.com//circuito_under",
  responseType: "json" // default
});