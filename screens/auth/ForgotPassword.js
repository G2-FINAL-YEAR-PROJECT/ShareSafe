import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../constants";
import styles from "./styles";
import { Button } from "../../ui";

const ForgotPassword = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.h1}>Forgot Password?</Text>
        <Text style={styles.subHeading}>Reset your password</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={globalStyles.label}>Email Address</Text>
        <TextInput style={globalStyles.input} placeholder="hello@example.com" />
      </View>

      <Button onPress={() => navigation.navigate("ResetPassword")}>Submit</Button>

      <View style={{ marginTop: 12, alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[globalStyles.link]}>Go back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;
