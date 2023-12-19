import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { globalStyles } from "../../constants";
import styles from "./styles";
import { Button } from "../../ui";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Validate name field
    if (!name.trim()) {
      alert("Name is required");
      return;
    }
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
    alert("Name: " + name + " Email: " + email + " Password: " + password);
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.h1}>Create and account</Text>
        <Text style={globalStyles.p}>Be a part of SafeShare</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={globalStyles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
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
        <Text style={globalStyles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="**********"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Button onPress={handleRegister}>Sign Up</Button>

      <View style={{ marginTop: 26, alignItems: "center" }}>
        <Text style={[globalStyles.h5]}>Have an account?</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[globalStyles.link]}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
