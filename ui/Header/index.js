import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Recommended } from "../../components";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import placeHolderImg from "../../assets/images/placeholder.jpg";
import { useAuth } from "../../store";
import { useEffect, useState } from "react";

const Header = ({ showBack, showSearchProfile, showLogo, showRecommended }) => {
  const navigation = useNavigation();

  const { userData } = useAuth();

  const [userInfo, setUserInfo] = useState(userData);

  const getUserData = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      if (data !== null) {
        setUserInfo(JSON.parse(data)?.userData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", getUserData);
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

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
                  source={
                    userInfo?.profilePicture
                      ? { uri: userInfo?.profilePicture }
                      : placeHolderImg
                  }
                  style={{
                    width: 37,
                    height: 37,
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: COLORS.respondBg,
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
