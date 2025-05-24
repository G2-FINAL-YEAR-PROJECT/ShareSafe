import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../store";
import { useEffect } from "react";

const NotificationHandlerComponent = () => {
  const navigation = useNavigation();
  const { notification, setNotification, token } = useAuth();

  useEffect(() => {
    console.log("New notification:", notification);

    // Check if user is authenticated
    if (token) {
      let screenToNavigate = "EmergencyDetails";
      let payload = { post: notification };

      // Check notification
      if (notification?.id && notification?.type) {
        navigation.navigate(screenToNavigate, payload);
      }
    } else {
      navigation.navigate("Login");
    }

    // Clear notification
    setNotification(null);
  }, [notification]);

  return;
};

export default NotificationHandlerComponent;
