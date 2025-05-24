import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  cardBox: {
    paddingVertical: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  userBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  userImage: {
    width: 42,
    height: 42,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 50,
    resizeMode: "contain",
  },

  username: {
    fontSize: 14,
    fontFamily: "semibold",
  },

  actionBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  respondent: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: COLORS.respondBg,
    borderRadius: 50,
    resizeMode: "contain",
  },

  followBtn: {
    backgroundColor: COLORS.primary,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 2.8,
    borderRadius: 20,
  },
  followText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: "semibold",
  },

  postText: {
    fontSize: 18,
    fontFamily: "regular",
  },
  showMore: {
    fontSize: 18,
    fontFamily: "medium",
    color: COLORS.primary,
  },
  postImage: {
    flex: 1,
    borderRadius: 10,
    width: undefined,
    height: undefined,
  },
  date: {
    fontSize: 11,
    fontFamily: "regular",
  },

  // STATUS STYLE

  statusBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  statusText: {
    fontFamily: "semibold",
  },

  confirmed: {
    paddingHorizontal: 10,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: COLORS.conBg,
    borderWidth: 2,
    borderColor: COLORS.conText,
  },
  responding: {
    paddingHorizontal: 10,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: COLORS.respondBg,
    borderWidth: 2,
    borderColor: COLORS.respondText,
  },
  resolved: {
    paddingHorizontal: 10,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: COLORS.resolveBg,
    borderWidth: 2,
    borderColor: COLORS.resolveText,
  },

  awaiting: {
    paddingHorizontal: 10,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: COLORS.aConBg,
    borderWidth: 2,
    borderColor: COLORS.aConText,
  },
  dismiss: {
    paddingHorizontal: 10,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: COLORS.dismissBg,
    borderWidth: 2,
    borderColor: COLORS.dismissText,
  },

  // STATUS STYLE ENDS

  intBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  metricBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  voteCount: {
    fontSize: 12,
    fontFamily: "medium",
  },

  commentBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

export default styles;
