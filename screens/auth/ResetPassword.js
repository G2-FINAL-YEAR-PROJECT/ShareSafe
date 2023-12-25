import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../constants";
import styles from "./styles";
import { Button, PasswordField } from "../../ui";
import { useState } from "react";
import axios from "axios";

const ResetPassword = ({ route, navigation }) => {
  const { token } = route.params?.token;
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    // Validate password
    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password does not match!");
      return;
    }

    try {
      setLoading(true);
      const baseUrl = "https://share-safe-kn9v.onrender.com/auth";
      const res = await axios.post(baseUrl + "/reset_password?token=" + token, {
        password,
        confirm_password: confirmPassword,
      });
      console.log(res.data);

      // Error handling
      if (res.data.status !== 200) {
        alert(res?.data?.message ?? "An error occurred. Please try again");
        return;
      }

      alert("Password reset successfully. Please log in");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.h1}>Reset Password</Text>
        <Text style={styles.subHeading}>Set the new password for your account</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={globalStyles.label}>New Password</Text>
        <PasswordField password={password} setPassword={setPassword} />
      </View>

      <View style={styles.formGroup}>
        <Text style={globalStyles.label}>Confirm Password</Text>
        <PasswordField password={confirmPassword} setPassword={setConfirmPassword} />
      </View>

      <Button onPress={handleSubmit} loading={loading}>
        Reset Password
      </Button>

      {/* <View style={{ marginTop: 16, alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={[globalStyles.link]}>Go back</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default ResetPassword;
