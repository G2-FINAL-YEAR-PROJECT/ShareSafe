import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Recommended, ProfileHeader } from "../../components";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const Header = ({
  showBack,
  showSearchNotify,
  showLogo,
  showProfile,
  showRecommended,
}) => {
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: (showRecommended || showProfile) && 30 }}>
      <View style={[styles.header, { width: "100%" }]}>
        <View style={styles.headerLeft}>
          {showLogo && (
            <Image
              source={require("../../assets/images/Logo.png")}
              width={37}
              height={34}
            />
          )}

          {showBack && (
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPressIn={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.headerRight}>
          {showSearchNotify && (
            <>
              <TouchableOpacity
                style={{ alignItems: "center", marginRight: 18 }}
                onPressIn={() => navigation.navigate("Search")}
              >
                <Ionicons name="search" size={24} color={COLORS.primary} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPressIn={() => navigation.navigate("Notifications")}
              >
                <Ionicons
                  name="notifications"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      {showRecommended && <Recommended />}
      {showProfile && <ProfileHeader />}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },

  headerLeft: {
    alignItems: "center",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
});
