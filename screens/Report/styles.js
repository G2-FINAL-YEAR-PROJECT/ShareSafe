import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  view: {
    backgroundColor: COLORS.white,
    paddingTop: 15,
    width: SIZES.width,
    paddingBottom: 80,
  },

  titleText: (size, weight, spacing, itemId, reportId) => {
    return {
      fontSize: size,
      fontFamily: weight,
      letterSpacing: spacing,
      color: itemId === reportId ? COLORS.white : COLORS.black,
    };
  },

  categories: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 10,
  },

  reportTypeBox: (itemId, reportId) => {
    return {
      borderWidth: 2,
      borderColor: COLORS.primary,
      borderRadius: 50,
      backgroundColor: itemId === reportId ? COLORS.primary : "transparent",
    };
  },

  reportContainer: {
    marginTop: 21,
  },

  inputContainer: (inputIsFocused) => {
    return {
      height: 130,
      marginTop: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderColor: COLORS.black,
      borderWidth: inputIsFocused ? 2 : 1,
      borderRadius: 10,
    };
  },
  reportInput: {
    fontSize: 15,
    textAlignVertical: "top",
  },
  // CHANNEL TO REPORT TO STYLES STARTS

  buttonStyle: (channelValue) => {
    return {
      width: "100%",
      backgroundColor: channelValue ? COLORS.primary : COLORS.gray,
      borderRadius: 10,
    };
  },

  buttonTextStyle: (channelValue) => {
    return {
      textAlign: "left",
      fontSize: 15,
      fontFamily: "medium",
      color: channelValue ? COLORS.white : COLORS.black,
    };
  },

  selectedRowStyle: (channelValue) => {
    return {
      backgroundColor: channelValue ? COLORS.primary : COLORS.white,
    };
  },
  selectedRowTextStyle: (channelValue) => {
    return {
      color: channelValue ? COLORS.white : COLORS.black,
    };
  },
  rowTextStyle: {
    fontSize: 15,
    fontFamily: "semibold",
    textAlign: "left",
  },

  media: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  mediaBtn: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  imageContainer: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.primary,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 20,
  },

  closeImage: {
    position: "absolute",
    right: -2,
    top: -15,
  },
});

export default styles;
