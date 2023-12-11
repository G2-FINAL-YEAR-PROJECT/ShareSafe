import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState({ name: "user" });

  const login = async (email, password) => {
    // console.log(email, password);
  };

  const signUp = async () => {
    //
  };

  return <AuthContext.Provider value={{ token, userData, login, signUp }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export { AuthContext, AuthProvider, useAuth };
