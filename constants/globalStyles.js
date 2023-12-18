import { Platform, StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  // Helpers
  flex: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  flexCenter: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  flexSB: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  // Shared
  container: {
    marginTop: Platform.OS === "android" ? 25 : 0, // Android SafeArea
    padding: 18,
    minHeight: "100%",
  },
  h1: {
    marginBottom: 6,
    fontSize: 30,
    fontWeight: "700",
  },
  p: {
    fontSize: 18,
    fontWeight: "400",
  },
  h5: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 12,
  },
  link: {
    fontSize: 18,
    fontWeight: "500",
    color: "#4141FF",
  },
});

export default globalStyles;
