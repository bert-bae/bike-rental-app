import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { Authorization: "foobar" },
});

export default client;
