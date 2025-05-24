import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const placeholder = require("../../assets/images/placeholder.jpg");

const RecommendedItem = ({ user }) => {
  const navigator = useNavigation();

  const goToUserProfile = () => {
    navigator.navigate("ProfileTabStack", {
      screen: "Profile",
      params: { user: user },
    });
  };

  return (
    <Pressable style={{ marginRight: 20 }} onPress={goToUserProfile}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={styles.imageContainer}>
          <Image
            source={
              user?.profilePicture ? { uri: user?.profilePicture } : placeholder
            }
            style={styles.image}
          />
        </View>
        <Text style={styles.imageText}>{user?.fullName}</Text>
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
    backgroundColor: COLORS.gray,
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
