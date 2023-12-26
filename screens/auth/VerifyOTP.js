import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { globalStyles } from "../../constants";
import styles from "./styles";
import { Button } from "../../ui";
import axios from "axios";

const VerifyOTP = ({ route, navigation }) => {
  const { email } = route.params;
  const [loading, setLoading] = useState(false);
  const [optCode, setOptCode] = useState("");

  const handleSubmit = async () => {
    if (optCode.length !== 6) {
      alert("Please enter a 6 digit code");
      return;
    }

    try {
      setLoading(true);
      const baseUrl = "https://share-safe-kn9v.onrender.com/auth";
      const res = await axios.post(baseUrl + "/verify_email", { token: optCode, email });
      const token = res?.data?.data?.tokens?.access?.token;

      // Error handling
      if (!token) {
        alert(res?.data?.message ?? "An error occurred. Please try again");
        return;
      }

      navigation.navigate("ResetPassword", { email, token });
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <View style={styles.header}>
          <Text style={globalStyles.h1}>Verification</Text>
          <Text style={styles.subHeading}>The OTP code has been sent to your email</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={globalStyles.label}>Enter Verification code</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="******"
            value={optCode}
            onChangeText={(text) => setOptCode(text)}
          />
        </View>

        <Button onPress={handleSubmit} loading={loading}>
          Continue
        </Button>

        <View style={[globalStyles.flexCenter, { marginTop: 26, alignItems: "center" }]}>
          <Text style={[globalStyles.h5, { marginBottom: 0 }]}>Didn't receive the OTP?</Text>

          <TouchableOpacity style={{ marginLeft: 8 }}>
            <Text style={[globalStyles.link]}>Resend</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 16, alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={[globalStyles.link]}>Go back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default VerifyOTP;
