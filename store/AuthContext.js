import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const baseUrl = "https://share-safe-kn9v.onrender.com/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getAuthData();
  }, []);

  const getAuthData = async () => {
    let authData = await AsyncStorage.getItem("@AuthData");
    authData = JSON.parse(authData);

    if (authData?.token && authData?.userData) {
      setToken(authData.token);
      setUserData(authData.userData);
    }
  };

  const login = async ({ email, password }) => {
    try {
      setLoading(true);
      const res = await axios.post(baseUrl + "/login", { email, password });
      const token = res?.data?.data?.tokens?.access?.token;
      const userData = res?.data?.data?.user;
      setLoading(false);

      // Error handling
      if (!token) {
        handleErrorMessage(res?.data?.message);
        return;
      }
      // Save token and user data
      setToken(token);
      setUserData(userData);
      // Persist data
      await AsyncStorage.setItem("@AuthData", JSON.stringify({ token, userData }));
    } catch (error) {
      console.log(error);
      handleErrorMessage();
    }
  };

  const register = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(baseUrl + "/register", data);
      const token = res?.data?.data?.tokens?.access?.token;
      const userData = res?.data?.data?.signUpUserData;
      setLoading(false);

      // Error handling
      if (!token) {
        handleErrorMessage(res?.data?.message);
        return;
      }
      // Save token and user data
      setToken(token);
      setUserData(userData);
      // Persist data
      await AsyncStorage.setItem("@AuthData", JSON.stringify({ token, userData }));
    } catch (error) {
      console.log(error);
      handleErrorMessage();
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@AuthData");
    setToken(null);
    setUserData(null);
  };

  const handleErrorMessage = (errorMessage) => {
    alert(errorMessage ?? "An error occurred. Please try again");
  };

  return (
    <AuthContext.Provider value={{ token, userData, loading, login, register, logout }}>
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
