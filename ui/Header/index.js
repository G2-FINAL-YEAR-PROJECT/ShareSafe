import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Recommended } from "../../components";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../store";

const Header = ({ showBack, showSearchProfile, showLogo, showRecommended }) => {
  const navigation = useNavigation();

  const { userData } = useAuth();

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
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPressIn={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.headerRight}>
          {showSearchProfile && (
            <>
              <TouchableOpacity
                style={{ alignItems: "center", marginRight: 18 }}
                onPressIn={() => navigation.navigate("Search")}
              >
                <Ionicons name="search" size={24} color={COLORS.primary} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPressIn={() =>
                  navigation.navigate("ProfileTabStack", {
                    screen: "Profile",
                    params: { user: userData },
                  })
                }
              >
                <Image
                  source={{ uri: userData?.profilePicture }}
                  style={{
                    width: 37,
                    height: 37,
                    borderRadius: 50,
                    resizeMode: "contain",
                  }}
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
