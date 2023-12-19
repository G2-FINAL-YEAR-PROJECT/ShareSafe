import axios from "axios";
import { createContext, useContext, useState } from "react";

const baseUrl = "https://share-safe-kn9v.onrender.com/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState({ name: "user" });

  const login = async (email, password) => {
    // TODO: implement loading state

    try {
      const res = await axios.post(baseUrl + "/login", { email, password });
      const token = res?.data?.data?.access?.token;
      // Error handling
      if (!token) handleErrorMessage(res?.data?.message);
      // Save token and user info
      setToken(token);
      setUserData(res?.data?.user);
    } catch (error) {
      console.log(error);
      handleErrorMessage();
    }
  };

  const register = async (data) => {
    //
  };

  const logout = async () => {};

  const handleErrorMessage = (errorMessage) => {
    alert(errorMessage ?? "An error occurred. Please try again");
    return;
  };

  return (
    <AuthContext.Provider value={{ token, userData, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export { AuthContext, AuthProvider, useAuth };
