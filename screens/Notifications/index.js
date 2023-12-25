import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useState, useRef } from "react";
import { useAnimation } from "../../hooks";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS } from "../../constants";
import { NotificationCard } from "../../ui";
import { posts, emergencies } from "../../data";

const Notifications = () => {
  const [showEmergency, setShowEmergency] = useState(true);
  const [showPost, setShowPost] = useState(true);

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
  return (
    <ScrollView
      style={[
        SIZES.safeAreaView,
        { backgroundColor: COLORS.white, paddingTop: 20 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* EMERGENCIES STARTS */}
      <View>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
            <Text style={styles.headerText(15, COLORS.primary, "semibold")}>
              Emergencies
            </Text>
            <Text style={styles.headerText(13, COLORS.black, "semibold")}>
              05
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
            {emergencies.map((item) => (
              <NotificationCard key={item.id} item={item} />
            ))}
          </Animated.View>
        </View>
      </View>

      {/* EMERGENCIES ENDS */}

      {/* POSTS STARTS */}

      <View style={{ marginTop: 28, marginBottom: 100 }}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
            <Text style={styles.headerText(15, COLORS.primary, "semibold")}>
              Posts
            </Text>
            <Text style={styles.headerText(13, COLORS.black, "semibold")}>
              05
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

        <View style={{ height: showPost ? "auto" : 0 }}>
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
        </View>
      </View>
      {/* POSTS ENDS */}
    </ScrollView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerText: (size, color, family) => {
    return {
      fontSize: size,
      color: color,
      fontFamily: family,
    };
  },
});
