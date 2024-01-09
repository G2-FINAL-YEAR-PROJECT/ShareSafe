import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { apiClient } from "../config";
import { registerForPushNotificationsAsync } from "../services/notification";
import {} from "../services/location";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  const [deviceExpoPushToken, setDeviceExpoPushToken] = useState("");
  const [notification, setNotification] = useState();
  const [notificationCount, setNotificationCount] = useState(0);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    getAuthData();
    // Notifications permission
    setupNotifications();

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const setupNotifications = async () => {
    const expoPushToken = await registerForPushNotificationsAsync();
    setDeviceExpoPushToken(expoPushToken);

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // update notification(Count)
        setNotificationCount((prevCount) => prevCount + 1);
      });

    // Sets up listener for notification response
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const notificationData = response.notification.request.content.data;
        setNotification(notificationData);
        // console.log("responseListener:", notificationData, response);
      });
  };

  const getAuthData = async () => {
    // await AsyncStorage.clear();
    try {
      let authData = await AsyncStorage.getItem("@AuthData");
      const viewedOnboarding = await AsyncStorage.getItem("@viewedOnboarding");

      authData = JSON.parse(authData);

      if (authData?.token && authData?.userData) {
        setToken(authData.token);
        setUserData(authData.userData);
        // Set the Bearer token in the headers
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${authData.token}`;
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
      const res = await apiClient.post("/auth/login", { email, password });
      const token = res?.data?.data?.tokens?.access?.token;
      const userData = res?.data?.data?.user;

      // Error handling
      if (!token) {
        handleErrorMessage(res?.data?.message);
        return;
      }
      // Save token and user data
      setToken(token);
      setUserData(userData);
      // Set the Bearer token in the headers
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Persist data
      await AsyncStorage.setItem(
        "@AuthData",
        JSON.stringify({ token, userData })
      );
    } catch (error) {
      console.log(error);
      handleErrorMessage();
    } finally {
      setLoadingLogin(false);
    }
  };

  const register = async (data) => {
    try {
      setLoadingRegister(true);
      const res = await apiClient.post("/auth/register", {
        ...data,
        pushToken: deviceExpoPushToken,
      });
      const token = res?.data?.data?.tokens?.access?.token;
      const userData = res?.data?.data?.user;
      // console.log(res?.data);

      // Error handling
      if (!token) {
        handleErrorMessage(res?.data?.message);
        return;
      }

      // Persist data
      await AsyncStorage.setItem(
        "@AuthData",
        JSON.stringify({ token, userData })
      );
      await AsyncStorage.setItem("@showWelcomeScreen", "true");
      // Set the Bearer token in the headers
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Save token and user data
      setToken(token);
      setUserData(userData);
    } catch (error) {
      setLoadingRegister(false);
      console.log(error);
      handleErrorMessage();
    } finally {
      setLoadingRegister(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@AuthData");
    await AsyncStorage.removeItem("userData");
    setToken(null);
    setUserData(null);
    // Remove the Bearer token in the headers
    delete apiClient.defaults.headers.common["Authorization"];
  };

  const handleErrorMessage = (errorMessage) => {
    alert(errorMessage ?? "An error occurred. Please try again");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userData,
        setUserData,
        loadingAuth,
        loadingLogin,
        loadingRegister,
        login,
        register,
        logout,
        viewedOnboarding,
        userProfile,
        setUserProfile,
        notification,
        setNotification,
        notificationCount,
        setNotificationCount,
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
