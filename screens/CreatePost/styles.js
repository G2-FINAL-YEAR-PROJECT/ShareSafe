import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  imageContainer: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.primary,
    marginBottom: 200,
    marginTop: 50,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 20,
  },

  closeImage: {
    position: "absolute",
    right: -2,
    top: -15,
  },
  userBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  user: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },

  image: {
    width: 35,
    height: 35,
    borderRadius: 50,
    resizeMode: "contain",
  },
  textStyle: (size, color, family) => {
    return {
      fontSize: size,
      color: color,
      fontFamily: family,
    };
  },

  media: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 50,
    position: "absolute",
    zIndex: 99,
  },

  cancel: {
    position: "absolute",
    zIndex: 99,
    top: 105,
    transform: [{ translateY: -50 }],
    right: 16,
  },
  camera: {
    bottom: 120,
    transform: [{ translateY: -120 }],
    right: 15,
  },
  gallery: {
    bottom: 90,
    transform: [{ translateY: -90 }],
    right: 15,
  },

  postBtn: (postIsValid, isLoading) => {
    return {
      alignItems: "center",
      paddingVertical: 5,
      paddingHorizontal: 20,
      borderRadius: 20,
      backgroundColor: COLORS.primary,
      opacity: postIsValid && !isLoading ? 1 : 0.5,
    };
  },
  postText: {
    fontSize: 15,
    color: COLORS.white,
    fontFamily: "medium",
  },
});

export default styles;
