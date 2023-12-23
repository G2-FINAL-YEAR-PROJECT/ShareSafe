import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const baseUrl = "https://share-safe-kn9v.onrender.com/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  useEffect(() => {
    getAuthData();
  }, []);

  const getAuthData = async () => {
    // await AsyncStorage.clear();
    // await AsyncStorage.removeItem("@AuthData");

    try {
      let authData = await AsyncStorage.getItem("@AuthData");
      const viewedOnboarding = await AsyncStorage.getItem("@viewedOnboarding");

      authData = JSON.parse(authData);

      if (authData?.token && authData?.userData) {
        setToken(authData.token);
        setUserData(authData.userData);
      }

      if (viewedOnboarding) {
        setViewedOnboarding(true);
      }
    } catch (error) {
      console.log("AuthContext: ", error);
    } finally {
      setLoadingAuth(false);
    }
  };

  const login = async ({ email, password }) => {
    try {
      setLoadingLogin(true);
      const res = await axios.post(baseUrl + "/login", { email, password });
      const token = res?.data?.data?.tokens?.access?.token;
      const userData = res?.data?.data?.user;
      setLoadingLogin(false);

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
      setLoadingRegister(true);
      const res = await axios.post(baseUrl + "/register", data);
      const token = res?.data?.data?.tokens?.access?.token;
      const userData = res?.data?.data?.signUpUserData;
      setLoadingRegister(false);

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
    <AuthContext.Provider
      value={{
        token,
        userData,
        loadingAuth,
        loadingLogin,
        loadingRegister,
        login,
        register,
        logout,
        viewedOnboarding,
      }}
    >
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
