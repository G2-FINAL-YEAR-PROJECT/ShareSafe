import * as Location from "expo-location";
import { API_KEY } from "@env";
import { Alert, Linking } from "react-native";
import axios from "axios";

// const LOCATION_TASK_NAME = "background-location-task";
const locationBaseUrl = "https://geocode.maps.co/reverse";

export const requestLocationPermission = async () => {
  try {
    const { status: foregroundStatus } =
      await Location.requestForegroundPermissionsAsync();
    // console.log("foregroundStatus", foregroundStatus);

    if (foregroundStatus === "granted") {
      const { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      // await Location.getBackgroundPermissionsAsync();
      // console.log("backgroundStatus", backgroundStatus, foregroundStatus);

      if (backgroundStatus !== "granted") {
        showBackgroundPermissionAlert();
        return;
      }
      // startBackgroundTracking();
    } else {
      showLocationRequiredAlert();
    }
  } catch (error) {
    console.log("requestLocationPermission", error);
  }
};

export const showBackgroundPermissionAlert = () => {
  Alert.alert(
    "Enable background location",
    'To receive emergency notifications, please choose "Allow all the time" for location access. Open app settings to update your preferences.',
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
        onPress: () => showBackgroundPermissionAlert(),
      },
    ],
    { cancelable: false }
  );
};

export const startBackgroundTracking = async () => {
  await Location.startLocationUpdatesAsync("backgroundLocationUpdates", {
    accuracy: Location.Accuracy.High,
    timeInterval: 2000, // Update every 10 minutes - 600000
    distanceInterval: 0,
    showsBackgroundLocationIndicator: true, // Show location icon in status bar
  });
};

export const stopBackgroundTracking = async () => {
  try {
    await Location.stopLocationUpdatesAsync("backgroundLocationUpdates");
  } catch (error) {
    console.log(error);
  }
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
