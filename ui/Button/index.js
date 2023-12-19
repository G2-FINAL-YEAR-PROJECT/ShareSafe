import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../../constants";

const Button = ({ onPress, children, textStyle, buttonStyle, loading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonStyle(loading), buttonStyle]}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.textStyle, textStyle]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  textStyle: {
    color: COLORS.white,
    fontFamily: "semibold",
    fontSize: 18,
  },
  buttonStyle: (loading) => {
    return {
      width: "100%",
      padding: 14,
      marginBottom: 18,
      borderRadius: 5,
      alignItems: "center",
      backgroundColor: COLORS.primary,
      opacity: loading ? 0.5 : 1,
    };
  },
});
