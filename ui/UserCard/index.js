import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { COLORS } from "../../constants";
import { useFollow } from "../../hooks";
import { useAuth } from "../../store";
import { useNavigation } from "@react-navigation/native";

const placeHolderImg = require("../../assets/images/placeholder.jpg");

const UserCard = ({ currentUser }) => {
  const { userData } = useAuth();

  const navigation = useNavigation();

  const { isFollowing, handleFollowUser } = useFollow();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProfileTabStack", {
          screen: "Profile",
          params: { user: currentUser },
        })
      }
    >
      <View style={[styles.cardBox]}>
        <View style={styles.user}>
          <Image
            source={
              currentUser?.profilePicture
                ? { uri: currentUser?.profilePicture }
                : placeHolderImg
            }
            style={styles.image}
          />
          <View style={{ flexBasis: "40%" }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 14,
                fontFamily: "bold",
                color: COLORS.white,
              }}
            >
              {currentUser?.fullName}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 11,
                fontFamily: "regular",
                color: "#D7D7D7",
              }}
            >
              {currentUser?.email}
            </Text>
          </View>
        </View>

        <View style={styles.profileAction}>
          {userData?.id !== currentUser?.id &&
            !currentUser.followers?.includes(userData?.id) &&
            !isFollowing && (
              <TouchableOpacity
                style={styles.followBtn}
                onPress={() => handleFollowUser(currentUser?.id)}
              >
                <Text style={styles.followText}>Follow</Text>
              </TouchableOpacity>
            )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  cardBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    elevation: 1,
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
    backgroundColor: COLORS.gray,
  },

  profileAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  followBtn: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 2.8,
    borderRadius: 20,
  },
  followText: {
    color: COLORS.black,
    fontSize: 14,
    fontFamily: "semibold",
  },
});
