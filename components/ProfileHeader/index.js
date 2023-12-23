import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useAuth } from "../../store";

const ProfileHeader = () => {
  const auth = useAuth();

  return (
    <View style={{ marginVertical: 30 }}>
      {/* PROFILE CARD STARTS */}
      <View style={[styles.cardBox]}>
        <View style={styles.user}>
          <Image source={require("../../assets/images/man.jpg")} style={styles.image} />
          <View>
            <Text style={{ fontSize: 14, fontFamily: "bold", color: COLORS.white }}>
              Ikechukwu Macaulay
            </Text>
            <Text style={{ fontSize: 11, fontFamily: "regular", color: "#D7D7D7" }}>
              @simplymiko
            </Text>
          </View>
        </View>

        <MaterialCommunityIcons name="pencil-outline" size={24} color={COLORS.white} />
      </View>
      {/* PROFILE CARD ENDS */}

      {/* METRICS STARTS */}
      <View style={styles.metric}>
        <Text style={styles.following("regular")}>144 followers</Text>
        <Text style={styles.following("regular")}>144 following</Text>
        <TouchableOpacity style={styles.logout} onPress={() => auth.logout()}>
          <Text style={[styles.following("medium"), { color: COLORS.white }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  cardBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 8,
  },

  user: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  image: {
    width: 57,
    height: 57,
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 50,
    resizeMode: "contain",
  },

  metric: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },

  following: (family) => {
    return {
      fontSize: 15,
      fontFamily: family,
    };
  },

  logout: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 3,
  },
});
