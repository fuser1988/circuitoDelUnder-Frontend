import axios from "axios";

export default axios.create({
  baseURL: "https://circuito-del-under-frontend.herokuapp.com/circuito_under",
  responseType: "json" // default
});