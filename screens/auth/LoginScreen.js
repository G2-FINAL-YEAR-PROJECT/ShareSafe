import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../constants";
import styles from "./styles";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.h1}>Login</Text>
        <Text style={globalStyles.p}>Welcome back to ShareSafe</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={globalStyles.label}>Email Address</Text>
        <TextInput style={styles.input} placeholder="hello@example.com" />
      </View>

      <View style={styles.formGroup}>
        <View style={globalStyles.flex}>
          <Text style={globalStyles.label}>Password</Text>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={[globalStyles.link, { fontSize: 16 }]}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TextInput style={styles.input} secureTextEntry={true} placeholder="**********" />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>Login</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 26, alignItems: "center" }}>
        <Text style={[globalStyles.h5]}>Don’t have an account?</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={[globalStyles.link]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
