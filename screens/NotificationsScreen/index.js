import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { useAnimation } from "../../hooks";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS } from "../../constants";
import { NotificationCard } from "../../ui";
import { useAuth } from "../../store";
import { apiClient } from "../../config";
import Loading from "../Loading";
import ErrorScreen from "../ErrorScreen";

const NotificationsScreen = ({ navigation }) => {
  const { setNotificationCount } = useAuth();

  const [showEmergency, setShowEmergency] = useState(true);
  const [showPost, setShowPost] = useState(true);

  const [loadingNotification, setLoadingNotification] = useState(true);
  const [allNotifications, setAllNotifications] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [clearing, setClearing] = useState(false);

  const { opacity: emergencyOpacity, scaleY: emergencyScaleY } = useAnimation(
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    showEmergency
  );

  const { opacity: postOpacity, scaleY: postScaleY } = useAnimation(
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    showPost
  );

  const handleEmergencyDrop = () => {
    setShowEmergency((preState) => !preState);
  };

  const handlePostDrop = () => {
    setShowPost((preState) => !preState);
  };

  const fetchNotifications = async () => {
    try {
      const res = await apiClient("/notification/user");

      if (res.data?.status !== 200) {
        throw new Error(res.data?.message);
      }

      console.log(res.data?.data);

      setAllNotifications(res.data?.data);
      setLoadingNotification(false);
      setNotificationCount(0);
    } catch (error) {
      alert(error?.message);
      console.log(error?.message);
      setErrorMessage(error?.message);
      setLoadingNotification(false);
    } finally {
      setLoadingNotification(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchNotifications();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const clearNotifications = async () => {
    setClearing(true);
    try {
      const res = await apiClient.delete("notification/clear");
      if (res.data?.status !== 200) {
        throw new Error(res.data?.message);
      }

      alert("Cleared Successfully");
      setAllNotifications([]);
      setClearing(false);
    } catch (error) {
      alert(error?.message);
      console.log(error?.message);
    } finally {
      setClearing(false);
    }
  };

  return (
    <ScrollView
      style={[
        SIZES.safeAreaView,
        { backgroundColor: COLORS.white, paddingTop: 65 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={styles.clear(allNotifications.length > 0, clearing)}
        disabled={!(allNotifications.length > 0) || clearing}
        onPress={clearNotifications}
      >
        {clearing ? (
          <ActivityIndicator size="small" color={COLORS.white} />
        ) : (
          <Text style={styles.clearText}>Clear All</Text>
        )}
      </TouchableOpacity>

      {/* EMERGENCIES STARTS */}

      {loadingNotification ? (
        <Loading />
      ) : errorMessage ? (
        <ErrorScreen message={errorMessage} />
      ) : (
        <>
          <View>
            <View style={styles.header}>
              <View
                style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
              >
                <Text style={styles.headerText(15, COLORS.primary, "semibold")}>
                  Emergencies
                </Text>
                <Text style={styles.headerText(13, COLORS.black, "semibold")}>
                  {allNotifications?.length}
                </Text>
              </View>

              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPressIn={handleEmergencyDrop}
              >
                <Ionicons
                  name={showEmergency ? "chevron-up" : "chevron-down"}
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>

            <View style={{ height: showEmergency ? "auto" : 0 }}>
              <Animated.View
                style={{
                  rowGap: 20,
                  marginTop: 18,
                  opacity: emergencyOpacity,
                  transform: [{ scaleY: emergencyScaleY }],
                }}
              >
                {allNotifications.map((item) => (
                  <NotificationCard key={item.id} item={item} />
                ))}
              </Animated.View>
            </View>
          </View>
          {/* EMERGENCIES ENDS */}
          {/* POSTS STARTS */}
          <View style={{ marginTop: 28, marginBottom: 100 }}>
            <View style={styles.header}>
              <View
                style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
              >
                <Text style={styles.headerText(15, COLORS.primary, "semibold")}>
                  Posts
                </Text>
                <Text style={styles.headerText(13, COLORS.black, "semibold")}>
                  0
                </Text>
              </View>

              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPressIn={handlePostDrop}
              >
                <Ionicons
                  name={showPost ? "chevron-up" : "chevron-down"}
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>

            {/* <View style={{ height: showPost ? "auto" : 0 }}>
          <Animated.View
            style={{
              rowGap: 20,
              marginTop: 18,
              opacity: postOpacity,
              transform: [{ scaleY: postScaleY }],
            }}
          >
            {posts.map((item) => (
              <NotificationCard key={item.id} item={item} forPosts />
            ))}
          </Animated.View>
        </View> */}
          </View>
        </>
      )}

      {/* POSTS ENDS */}
    </ScrollView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  clear: (notificationExist, clearing) => {
    return {
      opacity: notificationExist && !clearing ? 1 : 0.5,
      alignSelf: "flex-end",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.dismissBg,
      paddingVertical: 5,
      paddingHorizontal: 12,
      borderRadius: 5,
      marginBottom: 25,
    };
  },

  clearText: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: "semibold",
  },

  headerText: (size, color, family) => {
    return {
      fontSize: size,
      color: color,
      fontFamily: family,
    };
  },
});
