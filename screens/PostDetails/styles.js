import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
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
  replyBtn: (commentIsValid, uploadingComment) => {
    return {
      backgroundColor: COLORS.primary,
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 7,
      borderRadius: 20,
      opacity: commentIsValid && !uploadingComment ? 1 : 0.5,
    };
  },

  replyText: {
    color: COLORS.white,
    fontSize: 15,
    fontFamily: "semibold",
  },
});

export default styles;
