import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../constants";
import styles from "./styles";
import { Button } from "../../ui";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigator = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Validate email address
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    // Validate password
    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    // console.log(email, password);
    alert("Email: " + email + " Password: " + password);
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.h1}>Login</Text>
        <Text style={globalStyles.p}>Welcome back to ShareSafe</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={globalStyles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="hello@example.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <View style={globalStyles.flex}>
          <Text style={globalStyles.label}>Password</Text>
          <TouchableOpacity onPress={() => navigator.navigate("ForgotPassword")}>
            <Text style={[globalStyles.link, { fontSize: 16 }]}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="**********"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Button onPress={handleLogin}>Login</Button>

      <View style={{ marginTop: 26, alignItems: "center" }}>
        <Text style={[globalStyles.h5]}>Don’t have an account?</Text>

        <TouchableOpacity onPress={() => navigator.navigate("Register")}>
          <Text style={[globalStyles.link]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
