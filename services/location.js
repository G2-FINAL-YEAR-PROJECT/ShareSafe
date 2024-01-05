import * as Location from "expo-location";
import { API_KEY } from "@env";
import { Alert, Linking } from "react-native";
import axios from "axios";

// const LOCATION_TASK_NAME = "background-location-task";
const locationBaseUrl = "https://geocode.maps.co/reverse";

export const requestLocationPermission = async (setCurrentPosition) => {
  try {
    const { status: foregroundStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === "granted") {
      startForegroundTracking(setCurrentPosition);
    } else {
      showLocationRequiredAlert();
    }
  } catch (error) {
    console.log("requestLocationPermission", error);
  }
};

export const showGoToSettingsAlert = () => {
  Alert.alert(
    "Go to settings",
    'To receive emergency notifications, please choose "Allow while using the app" for location access. Open app settings to update your preferences.',
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Open Settings",
        onPress: () => Linking.openSettings(),
      },
    ],
    { cancelable: false }
  );
};

export const showLocationRequiredAlert = () => {
  Alert.alert(
    "Location Permission is Required",
    "Please enable location access to receive notification on emergency alerts happening near you. Your location data will not be shared for any other purposes.",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => showGoToSettingsAlert(),
      },
    ],
    { cancelable: false }
  );
};

export const startForegroundTracking = async (setCurrentPosition) => {
  await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 35000,
      distanceInterval: 0,
      mayShowUserSettingsDialog: false,
    },
    (location) => {
      // console.log("update location!", location.coords);
      const { latitude, longitude } = location?.coords;
      setCurrentPosition({ lat: latitude, lon: longitude });
    }
  );
};

export const fetchAddress = async (currentPosition) => {
  const { lat, lon } = currentPosition;
  try {
    const { data } = await axios.get(
      `${locationBaseUrl}?lat=${lat}&lon=${lon}&api_key=${API_KEY}`
    );

    // console.log("address", data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
