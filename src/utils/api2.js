import axios from "axios";

const server = 'https://localhost:3000/circuito_under/';

const API = {
  get: path => axios.get(`${server}${path}`).then(response => response.data),
  post: (path, body) => axios.post(`${server}${path}`, body).then(response => response.data),
};

export default API;