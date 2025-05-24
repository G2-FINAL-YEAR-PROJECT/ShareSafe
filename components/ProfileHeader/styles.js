import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  cardBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 8,
  },

  user: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  image: {
    width: 57,
    height: 57,
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 50,
    resizeMode: "contain",
    backgroundColor: COLORS.gray,
  },

  profileAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  followBtn: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 2.8,
    borderRadius: 20,
  },
  followText: {
    color: COLORS.black,
    fontSize: 14,
    fontFamily: "semibold",
  },

  metric: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },

  following: (family) => {
    return {
      fontSize: 15,
      fontFamily: family,
    };
  },

  logout: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 3,
  },
});

export default styles;
