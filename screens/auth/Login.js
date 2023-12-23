import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../store";
import { Button, PasswordField } from "../../ui";
import styles from "./styles";
import { validateEmail } from "../../helpers";

const Login = () => {
  const navigator = useNavigation();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // await AsyncStorage.removeItem("@viewedOnboarding");

    // Validate email address
    if (!validateEmail(email)) {
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
    <ScrollView style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.h1}>Login</Text>
        <Text style={styles.subHeading}>Welcome back to ShareSafe</Text>
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

      <Button onPress={handleLogin} loading={auth.loadingLogin}>
        Login
      </Button>

      <View style={{ marginTop: 26, alignItems: "center" }}>
        <Text style={[globalStyles.h5]}>Don’t have an account?</Text>

        <TouchableOpacity onPress={() => navigator.navigate("Register")}>
          <Text style={[globalStyles.link]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
