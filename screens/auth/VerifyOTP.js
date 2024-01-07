import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { globalStyles } from "../../constants";
import styles from "./styles";
import { Button } from "../../ui";
import { apiClient } from "../../config";
import { sendPasswordResetOTP } from "../../helpers";

const VerifyOTP = ({ route, navigation }) => {
  const { email } = route.params;
  const [optCode, setOptCode] = useState("");

  const handleSubmit = async () => {
    if (optCode.length !== 6) {
      alert("Please enter a 6 digit code");
      return;
    }
    navigation.navigate("ResetPassword", { email, otp: optCode });
  };

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <View style={styles.header}>
          <Text style={globalStyles.h1}>Verification</Text>
          <Text style={styles.subHeading}>
            The OTP code has been sent to your email
          </Text>
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

        <Button onPress={handleSubmit}>Continue</Button>

        <View
          style={[
            globalStyles.flexCenter,
            { marginTop: 26, alignItems: "center" },
          ]}
        >
          <Text style={[globalStyles.h5, { marginBottom: 0 }]}>
            Didn't receive the OTP?
          </Text>

          <TouchableOpacity
            style={{ marginLeft: 8 }}
            onPress={() => sendPasswordResetOTP(email)}
          >
            <Text style={[globalStyles.link]}>Resend</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 16, alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={[globalStyles.link]}>Go back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default VerifyOTP;
