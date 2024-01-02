import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from "react-native";

import { useState, useEffect } from "react";
import { COLORS, globalStyles } from "../../constants";
import styles from "./styles";
import { Button, PasswordField } from "../../ui";
import { validateEmail } from "../../helpers";
import { useAuth } from "../../store";
import SelectDropdown from "react-native-select-dropdown";
import { reportType } from "../../data";

const Register = ({ navigation }) => {
  const { register, loadingRegister, locationGranted } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [role, setRole] = useState("");
  const [accountCategory, setAccountCategory] = useState(" ");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const openAppSettings = () => {
    Linking.openSettings();
  };

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

    // Validations
    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!phoneNo) {
      alert("Phone Number is required");
      return;
    }

    if (!role) {
      alert("Account Type is required");
      return;
    }

    if (role === "Respondent" && !accountCategory) {
      alert("Account Category is required");
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

    let data = {
      fullName: name.trim(),
      email: email.trim(),
      role: role.toUpperCase(),
      password,
      phoneNumber: phoneNo.toString(),
    };
    if (role === "Respondent") data.category = accountCategory;

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
          <Text style={globalStyles.label}>Phone Number</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Your Phone Number"
            value={phoneNo}
            autoComplete="tel"
            keyboardType="numeric"
            onChangeText={(text) => setPhoneNo(text)}
          />
        </View>

        <View style={[styles.formGroup]}>
          <Text style={globalStyles.label}>Account Type</Text>

          <SelectDropdown
            data={["User", "Respondent"]}
            defaultButtonText="Select an option"
            onSelect={(selectedItem, index) => {
              setRole(selectedItem);
            }}
            buttonStyle={buttonStyle}
            buttonTextStyle={buttonTextStyle(role)}
          />
        </View>

        {role === "Respondent" && (
          <View style={[styles.formGroup]}>
            <Text style={globalStyles.label}>Account category</Text>

            <SelectDropdown
              data={reportType}
              defaultButtonText="Select an option"
              onSelect={(selectedItem, index) => {
                setAccountCategory(selectedItem.id);
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.type ? selectedItem.type : selectedItem;
              }}
              rowTextForSelection={(item) => {
                return item.type ? item.type : item;
              }}
              buttonStyle={buttonStyle}
              buttonTextStyle={buttonTextStyle(accountCategory)}
            />
          </View>
        )}

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

// SelectDropdown Styles
const buttonStyle = {
  width: "100%",
  borderColor: COLORS.gray2,
  borderWidth: 1,
  borderRadius: 4,
  backgroundColor: "transparent",
};

const buttonTextStyle = (state) => {
  return {
    fontSize: 15,
    color: state ? COLORS.black : "#5f5f5f",
    fontFamily: "regular",
    textAlign: "left",
  };
};

export default Register;
