import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  sendBox: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginVertical: 10,
  },

  receiveBox: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginVertical: 10,
  },

  image: {
    width: 46,
    height: 46,
    borderRadius: 50,
  },

  text: {
    fontSize: 11.5,
    fontFamily: "medium",
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 9.6,
  },

  sentText: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    flexBasis: "50%",
  },
  receivedText: {
    backgroundColor: COLORS.aConBg,
    color: COLORS.aConText,
    flexBasis: "60%",
  },

  actionBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    borderTopWidth: 2,
    borderTopColor: COLORS.primary,
    backgroundColor: COLORS.white,
    paddingVertical: 10,
  },
  mediaAction: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  replyBtn: (commentIsValid) => {
    return {
      backgroundColor: COLORS.primary,
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 7,
      borderRadius: 20,
      opacity: commentIsValid ? 1 : 0.5,
    };
  },

  replyText: {
    color: COLORS.white,
    fontSize: 15,
    fontFamily: "semibold",
  },
});

export default styles;
