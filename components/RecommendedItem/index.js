import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { COLORS } from "../../constants";

const RecommendedItem = ({ item }) => {
  return (
    <Pressable style={{ marginRight: 20 }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <Text style={styles.imageText}>{item.title}</Text>
      </View>
    </Pressable>
  );
};

export default RecommendedItem;

const styles = StyleSheet.create({
  image: {
    width: 42.5,
    height: 42.5,
    resizeMode: "contain",
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 50,
  },
  imageContainer: {
    borderRadius: 50,
  },
  imageText: {
    fontFamily: "semibold",
    fontSize: 10,
    textAlign: "center",
    marginTop: 10,
    width: 52,
  },
});
