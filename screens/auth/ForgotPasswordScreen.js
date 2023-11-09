import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { globalStyles } from "../../constants";
import styles from "./styles";
import { Button } from "../../ui";

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.h1}>Forgot Password?</Text>
        <Text style={globalStyles.p}>Reset your password</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={globalStyles.label}>Email Address</Text>
        <TextInput style={styles.input} placeholder="hello@example.com" />
      </View>

      <Button>Submit</Button>

      <View style={{ marginTop: 12, alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[globalStyles.link]}>Go back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
