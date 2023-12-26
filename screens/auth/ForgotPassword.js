import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { globalStyles } from "../../constants";
import styles from "./styles";
import { Button } from "../../ui";
import { validateEmail } from "../../helpers";
import axios from "axios";

const ForgotPassword = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    // Validation
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const baseUrl = "https://share-safe-kn9v.onrender.com/auth";
      const res = await axios.post(baseUrl + "/send_verification_email", { email });

      // Error handling
      if (res.data.status !== 200) {
        alert(res?.data?.message ?? "An error occurred. Please try again");
        return;
      }

      alert("A verification code has been sent to your email.");
      navigation.navigate("VerifyOTP", { email });
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
        <Text style={globalStyles.h1}>Forgot Password?</Text>
        <Text style={styles.subHeading}>Reset your password</Text>
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

      <Button onPress={handleSubmit} loading={loading}>
        Continue
      </Button>

      <View style={{ marginTop: 12, alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[globalStyles.link]}>Go back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;
