import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { formatTime } from "../../helpers";
const placeholder = require("../../assets/images/placeholder.jpg");

const NotificationCard = ({ item, forPosts }) => {
  const navigation = useNavigation();
  const profilePicture = item?.postedBy?.profilePicture
    ? { uri: item?.postedBy?.profilePicture }
    : placeholder;
  const title = `${item?.postedBy?.fullName} reported an emergency`;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("EmergencyDetails", {
          post: { id: item?.emergency },
        })
      }
    >
      <View style={styles.card}>
        <View style={styles.imageBox}>
          <Image style={styles.image(forPosts)} source={profilePicture} />
          <View style={{ flexBasis: "65%" }}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.message} numberOfLines={2}>
              {item?.body}
            </Text>
          </View>
        </View>

        <Text style={styles.time}>{formatTime(item?.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  imageBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  image: (forPosts) => {
    return {
      width: forPosts ? 48 : 50,
      height: forPosts ? 48 : 50,
      borderRadius: forPosts ? 4.8 : 50,
      resizeMode: "contain",
    };
  },

  title: {
    fontSize: 15,
    fontFamily: "semibold",
  },
  message: {
    fontSize: 15,
    fontFamily: "regular",
    flex: 1,
  },

  time: {
    fontSize: 9,
    fontFamily: "semibold",
  },
});
