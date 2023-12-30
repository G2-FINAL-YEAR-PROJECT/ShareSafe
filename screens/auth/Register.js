import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from "react-native";
import { useState } from "react";
import { globalStyles } from "../../constants";
import styles from "./styles";
import { Button, PasswordField } from "../../ui";
import { validateEmail } from "../../helpers";
import { useAuth } from "../../store";

const Register = ({ navigation }) => {
  const { register, loadingRegister, locationGranted } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const openAppSettings = () => {
  //   Linking.openSettings();
  // };
  const handleRegister = async () => {
    // if (!locationGranted) {
    //   Alert.alert(
    //     "Confirm",
    //     "Give location access",
    //     [
    //       {
    //         text: "No",
    //         style: "cancel",
    //       },
    //       {
    //         text: "Yes",
    //         onPress: () => {
    //           openAppSettings();
    //         },
    //       },
    //     ],
    //     { cancelable: false }
    //   );
    //   return;
    // }

    if (!name.trim()) {
      alert("Name is required");
      return;
    }
    // Validate email address
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }
    // Validate password
    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password does not match!");
      return;
    }

    const data = { fullName: name.trim(), email: email.trim(), password };
    await register(data);
  };

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <View style={styles.header}>
          <Text style={globalStyles.h1}>Create and account</Text>
          <Text style={styles.subHeading}>Be a part of SafeShare</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={globalStyles.label}>Name</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Your Name"
            value={name}
            autoComplete="name"
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={globalStyles.label}>Email Address</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="hello@example.com"
            value={email}
            autoComplete="email"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={globalStyles.label}>Password</Text>
          <PasswordField password={password} setPassword={setPassword} />
        </View>

        <View style={styles.formGroup}>
          <Text style={globalStyles.label}>Confirm Password</Text>
          <PasswordField
            password={confirmPassword}
            setPassword={setConfirmPassword}
          />
        </View>

        <Button onPress={handleRegister} loading={loadingRegister}>
          Sign Up
        </Button>

        <View style={{ marginTop: 26, alignItems: "center" }}>
          <Text style={[globalStyles.h5]}>Have an account?</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            disabled={loadingRegister}
          >
            <Text style={[globalStyles.link]}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;
