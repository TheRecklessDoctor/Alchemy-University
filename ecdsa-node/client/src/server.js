import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:3042",
  // baseURL: "https://ecdsa-node-production.up.railway.app",
});

export default server;
