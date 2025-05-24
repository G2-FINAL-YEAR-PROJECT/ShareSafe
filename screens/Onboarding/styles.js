import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navBox: {
    width: "100%",
  },
  navItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },

  nextBtn: {
    width: 82,
    height: 82,
    justifyContent: "center",
    borderRadius: 100,
  },
});

export default styles;
