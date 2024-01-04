import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { API_KEY } from "@env";
import { Alert, Linking, AppState } from "react-native";

// const LOCATION_TASK_NAME = "background-location-task";
const locationBaseUrl = "https://geocode.maps.co/reverse";

export const requestLocationPermission = async (
  setLocationGranted,
  setCurrentLocation
) => {
  // Define the background location task
  defineLocationTask(setCurrentLocation);

  try {
    const { status: foregroundStatus } =
      await Location.requestForegroundPermissionsAsync();
    // console.log("foregroundStatus", foregroundStatus);

    if (foregroundStatus === "granted") {
      const { status: backgroundStatus } =
        // await Location.requestBackgroundPermissionsAsync();
        await Location.getBackgroundPermissionsAsync();
      // console.log("backgroundStatus", backgroundStatus, foregroundStatus);

      if (backgroundStatus !== "granted") {
        showBackgroundPermissionAlert();
        setLocationGranted(false);
        return;
      }

      setLocationGranted(true);
      startBackgroundTracking();
    } else {
      setLocationGranted(false);
      showLocationRequiredAlert();
    }
  } catch (error) {
    console.log("requestLocationPermission", error);
    setLocationGranted(false);
    // showLocationPermissionAlert();
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
    timeInterval: 600000, // Update every 10 minutes - 600000
    distanceInterval: 0,
    showsBackgroundLocationIndicator: true, // Show location icon in status bar
  });
};

export const stopBackgroundTracking = async () => {
  await Location.stopLocationUpdatesAsync("backgroundLocationUpdates");
};

const defineLocationTask = (setCurrentLocation) => {
  TaskManager.defineTask("backgroundLocationUpdates", ({ data, error }) => {
    if (error) {
      console.log("TaskManager error");
      return;
    }
    // Process location data
    const { locations } = data;
    const {
      coords: { latitude, longitude },
    } = locations[0];
    console.log("++++ Background location update:", { latitude, longitude });
    setCurrentLocation({ longitude, latitude });
  });
};

export const fetchAddress = async (location) => {
  const { longitude, latitude } = location;
  try {
    const { data } = await axios.get(
      `${locationBaseUrl}?lat=${latitude}&lon=${longitude}&api_key=${API_KEY}`
    );

    console.log("address", data);
  } catch (error) {
    console.log("error", error);
  }
};
