import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  cardBox: {
    paddingHorizontal: 11,
    paddingVertical: 14,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  headerImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    resizeMode: "contain",
  },

  username: {
    fontSize: 12,
    color: COLORS.black2,
    fontFamily: "semibold",
  },

  date: {
    fontSize: 10,
    color: COLORS.black,
    fontFamily: "medium",
    marginTop: -4,
  },

  postImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },

  postText: {
    fontSize: 11,
    fontFamily: "medium",
    marginTop: 10,
  },

  seeMore: {
    fontSize: 12,
    fontFamily: "semibold",
  },

  intBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },

  metricBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  metricCount: {
    fontSize: 9,
    fontFamily: "semibold",
  },
});

export default styles;
