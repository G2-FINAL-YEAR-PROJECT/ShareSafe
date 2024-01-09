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
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import Button from "../../ui/Button";
import { PasswordField } from "../../ui";
import { Ionicons } from "@expo/vector-icons";
import { uploadToCloudinary } from "../../helpers";
import { useAuth } from "../../store";
import DateTimePicker from "@react-native-community/datetimepicker";
import { apiClient } from "../../config";
import { usePickImage } from "../../hooks";
import { useNavigation } from "@react-navigation/native";

const EditProfile = () => {
  const navigation = useNavigation();
  const { userData, logout } = useAuth();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPW, setLoadingPW] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [inputData, setInputData] = useState(userData);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [previewImage, setPreviewImage] = useState(null);

  const { pickImage } = usePickImage(setPreviewImage);

  const [userInfo, setUserInfo] = useState(userData);

  const getUserData = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      if (data !== null) {
        setUserInfo(JSON.parse(data)?.userData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", getUserData);
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  const handleProfileUpdate = async () => {
    // Validate input fields
    if (!inputData?.fullName) {
      alert("Name is required");
      return;
    }
    if (!inputData?.phoneNumber) {
      alert("Phone number is required");
      return;
    }

    setLoadingProfile(true);
    const data = {
      fullName: inputData.fullName.trim(),
      phoneNumber: inputData.phoneNumber,
      dob: inputData.dob,
    };

    try {
      if (previewImage) {
        const imageUrl = await uploadToCloudinary(previewImage);
        data.profilePicture = imageUrl;
      }
      const res = await apiClient.put("/users/update", data);
      const userData = res?.data?.data;
      await AsyncStorage.setItem("userData", JSON.stringify({ userData }));
      setLoadingProfile(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      alert("Error updating profile!");
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    // Validate password
    if (newPassword.length < 8 || oldPassword.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Password does not match!");
      return;
    }

    setLoadingPW(true);
    try {
      const res = await apiClient.put("/users/update/password", {
        oldPassword,
        newPassword,
      });

      if (res.data?.status !== 200) {
        throw new Error(res.data?.message);
      }
      alert("Password updated successfully");
      setLoadingPW(false);
    } catch (error) {
      alert(error?.message);
      console.log(error?.message);
      setLoadingPW(false);
    } finally {
      setLoadingPW(false);
    }
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

  const ProfilePhoto = userInfo.profilePicture
    ? { uri: userInfo?.profilePicture }
    : require("../../assets/images/placeholder.jpg");

  return (
    <ScrollView
      style={[
        SIZES.safeAreaView,
        { paddingTop: 5, backgroundColor: COLORS.white },
      ]}
    >
      <TouchableOpacity style={styles.photoWrapper} onPress={pickImage}>
        <Image
          style={styles.pic}
          source={previewImage ? { uri: previewImage } : ProfilePhoto}
        />

        {previewImage && (
          <TouchableOpacity
            style={styles.cancelIconOverlay}
            onPress={() => setPreviewImage(null)}
          >
            <Ionicons name="close-circle" style={{}} size={35} color="red" />
          </TouchableOpacity>
        )}
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
          style={[globalStyles.input, { color: "#777" }]}
          value={inputData?.email || ""}
          editable={false}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={globalStyles.label}>Phone Number</Text>
        <TextInput
          style={globalStyles.input}
          value={inputData?.phoneNumber || ""}
          autoComplete="tel"
          keyboardType="numeric"
          onChangeText={(text) =>
            setInputData({ ...inputData, phoneNumber: text })
          }
        />
      </View>

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
            <Text style={globalStyles.label}>Old Password</Text>
          </View>
          <PasswordField password={oldPassword} setPassword={setOldPassword} />
        </View>

        <View style={styles.formGroup}>
          <View style={globalStyles.flex}>
            <Text style={globalStyles.label}>New Password</Text>
          </View>
          <PasswordField password={newPassword} setPassword={setNewPassword} />
        </View>

        <View style={styles.formGroup}>
          <View style={globalStyles.flex}>
            <Text style={globalStyles.label}>Confirm New Password</Text>
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
    position: "relative",
  },
  cancelIconOverlay: {
    position: "absolute",
    top: 0,
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#00000085",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
