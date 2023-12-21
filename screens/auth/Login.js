import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../store";
import { Button, PasswordField } from "../../ui";
import styles from "./styles";

const Login = () => {
  const navigator = useNavigation();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // await AsyncStorage.removeItem("@viewedOnboarding");

    // Validate email address
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email.trim())) {
      alert("Please enter a valid email address");
      return;
    }
    // Validate password
    if (!password.trim()) {
      alert("Password is required");
      return;
    }
    // Authenticate
    const data = { email: email.trim(), password: password };
    await auth.login(data);
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
          style={globalStyles.input}
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

        <PasswordField password={password} setPassword={setPassword} />
      </View>

      <Button onPress={handleLogin} loading={auth.loading}>
        Login
      </Button>

      <View style={{ marginTop: 26, alignItems: "center" }}>
        <Text style={[globalStyles.h5]}>Don’t have an account?</Text>

        <TouchableOpacity onPress={() => navigator.navigate("Register")}>
          <Text style={[globalStyles.link]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
