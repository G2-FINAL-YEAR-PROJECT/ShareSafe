import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const ChatList = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ChatDetails", { message: item })}
    >
      <View style={styles.chatBox}>
        <View style={styles.userData}>
          <View>
            <Image style={styles.image} source={item.image} />
            <View style={styles.status(item.status)} />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.text(15, "semibold")}>{item.username}</Text>
            <Text
              style={[styles.text(11.6, "medium"), { marginTop: -6 }]}
              numberOfLines={1}
            >
              {item.message}
            </Text>
          </View>
        </View>

        <Text style={styles.time}>{item.time}</Text>
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
    gap: 5,
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
    flexBasis: "60%",
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
    fontSize: 12.5,
    fontFamily: "medium",
  },
});
