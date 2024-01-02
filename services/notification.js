import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

export const registerForPushNotificationsAsync = async () => {
  if (Device.isDevice) {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // Check existing permissions
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      // Alert the user if permissions are not granted
      if (finalStatus !== "granted") {
        alert("Notification permissions not granted!");
        return;
      }

      console.log("finalStatus", finalStatus);

      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      console.log("token", token);
      return token;
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }
};
