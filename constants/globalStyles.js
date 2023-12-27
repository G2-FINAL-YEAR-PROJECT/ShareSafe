import { Platform, StyleSheet } from "react-native";
import { COLORS } from "./theme";

export const globalStyles = StyleSheet.create({
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
    padding: 18,
    marginTop: Platform.OS === "android" ? 30 : 0,
    minHeight: "100%",
  },
  h1: {
    fontSize: 30,
    fontFamily: "bold",
  },
  h2: {
    fontSize: 28,
    fontFamily: "bold",
  },
  h3: {
    fontSize: 24,
    fontFamily: "semibold",
  },
  p: {
    fontSize: 16,
    fontFamily: "regular",
  },
  h5: {
    fontSize: 18,
    fontFamily: "medium",
    marginBottom: 4,
  },
  label: {
    fontSize: 18,
    fontFamily: "medium",
    marginBottom: 10,
  },
  link: {
    fontSize: 18,
    fontFamily: "medium",
    color: COLORS.primary,
  },
  input: {
    padding: 10,
    fontSize: 15,
    // fontFamily: "regular",
    paddingHorizontal: 12,
    borderColor: COLORS.gray2,
    borderWidth: 1,
    borderRadius: 4,
  },
});
