import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useLocationContext } from "../../store";
import { formatHumanFriendlyDate, getProfilePic } from "../../helpers";

const ChatList = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ChatDetails", { messageItem: item })}
    >
      <View style={styles.chatBox}>
        <View style={styles.userData}>
          <View>
            <Image
              style={styles.image}
              source={getProfilePic(item?.targetUser?.profilePicture)}
            />
            <View style={styles.status("")} />
          </View>

          <View style={styles.textBox}>
            <Text style={styles.text(15, "semibold")}>
              {item?.targetUser?.fullName}
            </Text>

            <Text
              style={[styles.text(11.6, "medium"), { marginTop: -2 }]}
              numberOfLines={1}
            >
              {item?.message}
            </Text>
          </View>
        </View>

        <Text style={styles.time}>
          {formatHumanFriendlyDate(item?.createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  chatBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  userData: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  image: {
    width: 48,
    height: 48,
    borderRadius: 50,
    resizeMode: "contain",
  },

  status: (status) => {
    return {
      width: 10,
      height: 10,
      borderRadius: 10,
      backgroundColor: status === "online" ? COLORS.green : COLORS.gray6,
      position: "absolute",
      right: 0,
    };
  },

  textBox: {
    flexBasis: "56%",
  },
  text: (size, family) => {
    return {
      fontSize: size,
      fontFamily: family,
      color: COLORS.black2,
    };
  },

  time: {
    color: COLORS.gray8,
    fontSize: 12,
    fontFamily: "medium",
  },
});
