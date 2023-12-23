import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const NotificationCard = ({ item, forPosts }) => {
  return (
    <TouchableOpacity>
      <View style={styles.card}>
        <View style={styles.imageBox}>
          <Image style={styles.image(forPosts)} source={item.image} />
          <View style={{ flexBasis: "65%" }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message} numberOfLines={2}>
              {item.message}
            </Text>
          </View>
        </View>

        <Text style={styles.time}>{item.time}</Text>
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
