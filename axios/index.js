import axios from "axios";

export const authFetch = axios.create({
  baseURL: "https://share-safe-85lb.onrender.com",
  headers: {
    Accept: "application/json",
  },
});
