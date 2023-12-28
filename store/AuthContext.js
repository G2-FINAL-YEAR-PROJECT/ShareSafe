import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Location from "expo-location";
import { createContext, useContext, useEffect, useState } from "react";
import * as TaskManager from "expo-task-manager";
import { API_KEY } from "@env";

const LOCATION_TASK_NAME = "background-location-task";

const baseUrl = "https://share-safe-85lb.onrender.com/auth";
const locationBaseUrl = "https://geocode.maps.co/reverse";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);

  const [currentLocation, setCurrentLocation] = useState({});

  useEffect(() => {
    requestLocationPermission();
    getAuthData();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status == "granted") {
        const { status } = await Location.requestBackgroundPermissionsAsync();
        if (status === "granted") {
          setLocationGranted(true);
        } else {
          setLocationGranted(false);
        }
      } else {
        setLocationGranted(false);
      }
    } catch (error) {
      setLocationGranted(false);
    }
  };

  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      console.log("TaskManager error");
      return;
    }

    // Process location data
    const { locations } = data;
    const {
      coords: { latitude, longitude },
    } = locations[0];
    setCurrentLocation({ longitude, latitude });
    // console.log("Background location update:", locations);
  });

  useEffect(() => {
    if (locationGranted) {
      // Start background tracking when component mounts
      startBackgroundTracking();

      // Cleanup function to stop background tracking when component unmounts
      return () => {
        stopBackgroundTracking();
      };
    }
  }, [locationGranted]); // Empty dependency array ensures this effect runs only once when the component mounts

  const startBackgroundTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.High,
      timeInterval: 120000, // Update every 60 seconds
      distanceInterval: 0,
      showsBackgroundLocationIndicator: true, // Show location icon in status bar
    });
  };

  const stopBackgroundTracking = async () => {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  };

  // const fetchAddress = async () => {
  //   const { longitude, latitude } = currentLocation;

  //   try {

  //     const { data } = await axios.get(
  //       `${locationBaseUrl}?lat=${latitude}&lon=${longitude}&api_key=${API_KEY}`
  //     );

  //     console.log("address", data);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // useEffect(() => {
  //   if (currentLocation) {
  //     // update backend with users current coordinates
  //   }
  // }, [currentLocation]);

  const getAuthData = async () => {
    // await AsyncStorage.clear();

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
      await AsyncStorage.setItem(
        "@AuthData",
        JSON.stringify({ token, userData })
      );
    } catch (error) {
      console.log(error);
      handleErrorMessage();
    }
  };

  const register = async (data) => {
    try {
      setLoadingRegister(true);
      const res = await axios.post(baseUrl + "/register", {
        ...data,
        location: "New York",
      });
      const token = res?.data?.data?.tokens?.access?.token;
      const userData = res?.data?.data?.signUpUserData;
      setLoadingRegister(false);

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

      // Save token and user data
      setToken(token);
      setUserData(userData);
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
        locationGranted,
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
