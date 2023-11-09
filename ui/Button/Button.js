import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const Button = ({ onPress, children, textStyle, buttonStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, buttonStyle]}>
      <Text style={[styles.textStyle, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonStyle: {
    width: "100%",
    padding: 14,
    marginBottom: 18,
    borderRadius: 4,
    alignItems: "center",
    backgroundColor: "#4141FF",
  },
});
