import axios from "axios";

// Create a custom Axios instance
const apiClient = axios.create({
  baseURL: "https://share-safe-85lb.onrender.com",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set the Bearer token in the headers
// apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// Remove the Bearer token in the headers
// delete axios.defaults.headers.common["Authorization"];

export { apiClient };
