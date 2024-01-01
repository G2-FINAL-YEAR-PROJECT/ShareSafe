import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import { COLORS, SIZES, globalStyles } from "../../constants";
import React, { useState } from "react";
import Button from "../../ui/Button";
import { PasswordField } from "../../ui";
import { validateEmail } from "../../helpers";
import { useAuth } from "../../store";
import DateTimePicker from "@react-native-community/datetimepicker";
import { apiClient } from "../../config";

const EditProfile = () => {
  const { userData, logout } = useAuth();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPW, setLoadingPW] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [inputData, setInputData] = useState(userData);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfileUpdate = () => {
    // Validate input fields
    if (!inputData?.fullName) {
      alert("Name is required");
      return;
    }

    if (!validateEmail(inputData?.email || "")) {
      alert("Please enter a valid email address");
      return;
    }

    // setLoadingProfile(true);

    const data = {
      fullName: inputData.fullName.trim(),
      email: inputData.email.trim(),
      location: inputData.location,
      dob: inputData.dob,
    };
    console.log(inputData);
    console.log(data);
  };

  const handleChangePassword = () => {
    // Validate password
    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password does not match!");
      return;
    }

    // setLoadingPW(true);

    console.log(password);
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete account",
      "Are you sure you want to delete your account?",
      [
        { text: "NO", style: "cancel" },
        {
          text: "YES",
          onPress: async () => {
            setLoadingDelete(true);
            try {
              const res = await apiClient.delete("/users/" + userData.id);
              if (res.data.status !== 200) {
                alert("An error occurred. Please try again");
              }
              await logout(); // Clear user credentials
            } catch (error) {
              console.log(error);
              alert("An error occurred. Please try again");
            } finally {
              setLoadingDelete(false);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[
        SIZES.safeAreaView,
        { paddingTop: 5, backgroundColor: COLORS.white },
      ]}
    >
      <TouchableOpacity style={styles.photoWrapper}>
        <Image
          style={styles.pic}
          source={require("../../assets/images/placeholder.jpg")}
        />
      </TouchableOpacity>

      <Text
        style={[
          globalStyles.h5,
          { fontSize: 16, textAlign: "center", marginBottom: 30 },
        ]}
      >
        Change Profile Picture
      </Text>

      <View style={styles.formGroup}>
        <Text style={globalStyles.label}>Name</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Your Name"
          value={inputData?.fullName || ""}
          autoComplete="name"
          onChangeText={(text) =>
            setInputData({ ...inputData, fullName: text })
          }
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={globalStyles.label}>Email Address</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="hello@example.com"
          value={inputData?.email || ""}
          autoComplete="email"
          onChangeText={(text) => setInputData({ ...inputData, email: text })}
        />
      </View>

      {/* <View style={styles.formGroup}>
        <Text style={globalStyles.label}>Location</Text>
        <TextInput
          style={globalStyles.input}
          value={inputData?.location || ""}
          autoComplete="address-line1"
          onChangeText={(text) => setInputData({ ...inputData, location: text })}
        />
      </View> */}

      <View style={styles.formGroup}>
        <Text style={globalStyles.label}>Date of Birth</Text>

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={[globalStyles.input, { color: "black" }]}
            placeholder="00/00/0000"
            value={inputData?.dob || ""}
            editable={false}
          />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={inputData?.dob ? new Date(inputData.dob) : new Date()}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              setInputData({ ...inputData, dob: selectedDate.toDateString() });
            }}
          />
        )}
      </View>

      <Button
        onPress={handleProfileUpdate}
        loading={loadingProfile}
        textStyle={{ fontSize: 16 }}
        buttonStyle={{ width: "70%", padding: 12 }}
      >
        Update
      </Button>

      <View style={{ marginTop: 40 }}>
        <Text style={[globalStyles.h3, { marginBottom: 25 }]}>
          Change Password
        </Text>

        <View style={styles.formGroup}>
          <View style={globalStyles.flex}>
            <Text style={globalStyles.label}>Password</Text>
          </View>
          <PasswordField password={password} setPassword={setPassword} />
        </View>

        <View style={styles.formGroup}>
          <View style={globalStyles.flex}>
            <Text style={globalStyles.label}>Password</Text>
          </View>
          <PasswordField
            password={confirmPassword}
            setPassword={setConfirmPassword}
          />
        </View>

        <Button
          onPress={handleChangePassword}
          loading={loadingPW}
          textStyle={{ fontSize: 16 }}
          buttonStyle={{ width: "70%", padding: 12, marginRight: 90 }}
        >
          Change Password
        </Button>
      </View>

      <View style={{ marginVertical: 40 }}>
        <Text style={[globalStyles.h3]}>Delete Account</Text>
        <Text style={[globalStyles.p, { marginTop: 15, marginBottom: 24 }]}>
          Deleting your account will remove all of your information from our
          database. This can not be undone.
        </Text>

        <Button
          onPress={handleDeleteAccount}
          loading={loadingDelete}
          textStyle={{ fontSize: 16 }}
          buttonStyle={{
            width: "70%",
            backgroundColor: "red",
            padding: 12,
            marginRight: 90,
          }}
        >
          Delete account
        </Button>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  photoWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: 12,
  },
  pic: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  formGroup: {
    marginBottom: 30,
  },
});
