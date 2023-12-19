import { StyleSheet } from "react-native";
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
    minHeight: "100%",
  },
  h1: {
    marginBottom: 6,
    fontSize: 30,
    fontFamily: "bold",
  },
  p: {
    fontSize: 18,
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
    marginBottom: 12,
  },
  link: {
    fontSize: 18,
    fontFamily: "medium",
    color: COLORS.primary,
  },
});
