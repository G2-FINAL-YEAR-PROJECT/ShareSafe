import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { COLORS } from "../../constants";

const Button = ({ onPress, children, textStyle, buttonStyle, loading, icon }) => {
  console.log(loading);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.buttonStyle(loading), buttonStyle]}
      disabled={loading}
    >
      {icon && icon}
      {loading ? (
        <ActivityIndicator color={"#fff"} size={32} />
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
      opacity: loading ? 0.68 : 1,
    };
  },
});
