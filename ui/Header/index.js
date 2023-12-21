import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Recommended } from "../../components";
import { COLORS } from "../../constants";

const Header = ({
  showBack,
  showSearchNotify,
  showLogo,
  showCancel,
  showRecommended,
}) => {
  //<Ionicons name="arrow-back" size={24} color="black" />

  return (
    <View style={{ marginTop: showRecommended && 30 }}>
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
            <TouchableOpacity style={{ alignItems: "center" }}>
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.headerRight}>
          {showSearchNotify && (
            <>
              <TouchableOpacity
                style={{ alignItems: "center", marginRight: 18 }}
              >
                <Ionicons name="search" size={24} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
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
