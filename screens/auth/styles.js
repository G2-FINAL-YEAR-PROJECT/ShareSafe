import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  header: {
    marginTop: 80,
    marginBottom: 60,
  },
  formGroup: {
    marginBottom: 30,
  },
  input: {
    padding: 8,
    fontSize: 15,
    paddingHorizontal: 12,
    borderColor: COLORS.gray2,
    borderWidth: 1,
    borderRadius: 4,
  },
  button: {
    width: "100%",
    padding: 14,
    marginBottom: 18,
    borderRadius: 4,
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
});

export default styles;
