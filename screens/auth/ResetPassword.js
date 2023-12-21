import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../constants";
import styles from "./styles";
import { Button } from "../../ui";

const ResetPassword = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.h1}>Reset Password</Text>
        <Text style={globalStyles.p}>The OTP code has been sent to your email</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={globalStyles.label}>Enter OTP</Text>
        <TextInput style={globalStyles.input} placeholder="" />
      </View>

      <Button>Verify</Button>

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
  );
};

export default ResetPassword;
