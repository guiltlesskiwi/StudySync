import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("====== AXIOS REQUEST ======");
  console.log("URL:", config.baseURL + config.url);
  console.log("TOKEN:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;