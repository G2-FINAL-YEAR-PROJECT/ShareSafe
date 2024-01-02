import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

export const registerForPushNotificationsAsync = async () => {
  // Determines how to handles notifications when the app is in the foreground
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  try {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      // Check existing notification permissions
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // If permissions are not granted, request them
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      // if permissions still are not granted, alert the user
      if (finalStatus !== "granted") {
        alert("Notification permissions not granted!");
        return;
      }

      // Get the device's Expo Push Token
      const { data: token } = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });

      if (!token) {
        alert("Device push token not found");
        return;
      }

      // console.log("permission:", finalStatus);
      // console.log("expoPushToken:", token);
      return token;
    } else {
      alert("Must use physical device for Push Notifications");
    }
  } catch (error) {
    console.log(error);
  }
};
