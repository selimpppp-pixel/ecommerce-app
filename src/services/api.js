import axios from "axios";

const API = axios.create({
  baseURL: "https://sandbox.mockerito.com/ecommerce/api",
});

export default API;