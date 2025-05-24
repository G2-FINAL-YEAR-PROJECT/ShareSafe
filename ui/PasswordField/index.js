import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, globalStyles } from "../../constants";

const PasswordField = ({ password, setPassword }) => {
  const [showPassword, setshowPassword] = useState(false);

  return (
    <View style={styles.passwordField}>
      <TextInput
        style={globalStyles.input}
        secureTextEntry={!showPassword}
        placeholder="**********"
        autoComplete="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={() => setshowPassword(!showPassword)} style={styles.passwordIcon}>
        <Ionicons
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          size={24}
          color={COLORS.gray5}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordField;

const styles = StyleSheet.create({
  passwordField: {
    display: "flex",
    justifyContent: "center",
  },
  passwordIcon: {
    position: "absolute",
    right: 15,
  },
});
