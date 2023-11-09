import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { globalStyles } from "../../constants";
import styles from "./styles";

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.h1}>Create and account</Text>
        <Text style={globalStyles.p}>Be a part of SafeShare</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={globalStyles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="Your Name" />
      </View>

      <View style={styles.formGroup}>
        <Text style={globalStyles.label}>Email Address</Text>
        <TextInput style={styles.input} placeholder="hello@example.com" />
      </View>

      <View style={styles.formGroup}>
        <Text style={globalStyles.label}>Password</Text>
        <TextInput style={styles.input} secureTextEntry={true} placeholder="**********" />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>Sign Up</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 26, alignItems: "center" }}>
        <Text style={[globalStyles.h5]}>Have an account?</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[globalStyles.link]}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
