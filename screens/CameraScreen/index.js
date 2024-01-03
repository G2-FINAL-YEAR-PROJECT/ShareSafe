import {
  View,
  StyleSheet,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants";

const CameraScreen = ({ route }) => {
  const navigation = useNavigation();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);

  const previousPage = route?.params?.from;

  useEffect(() => {
    (async () => {
      try {
        await requestPermission();
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const triggerRequest = () => {
    Alert.alert(
      "Close",
      "Allow ShareSafe to use camera?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            return Platform.OS === "ios"
              ? Linking.openURL("app-settings:")
              : Linking.openSettings();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleTakePicture = async () => {
    try {
      const photo = await cameraRef.takePictureAsync();

      navigation.navigate({
        name: previousPage,
        params: { imageUri: photo?.uri },
        merge: true,
      }); // Navigate back to Create Post screen
    } catch (error) {
      console.loge(error);
    }
  };

  const handleFlip = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS?.black,
      }}
    >
      <Camera
        style={{ flex: 0.77 }}
        type={type}
        ref={(ref) => setCameraRef(ref)}
        ratio="16:9"
      />

      <View
        style={{
          position: "absolute",
          bottom: 50,
          right: 50,
          left: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={!permission?.granted ? triggerRequest : handleTakePicture}
          style={styles.shutter}
        >
          <MaterialIcons name="shutter-speed" size={40} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.flip} onPress={handleFlip}>
        <MaterialIcons
          name="flip-camera-android"
          size={28}
          color={COLORS.white}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.close}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons
          name="close-circle-outline"
          size={28}
          color={COLORS.white}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  shutter: {
    width: 100,
    height: 100,
    borderWidth: 20,
    borderColor: COLORS.white,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  flip: {
    position: "absolute",
    bottom: 85,
    right: 90,
    justifyContent: "center",
    alignItems: "center",
  },

  close: {
    position: "absolute",
    top: 60,
    right: 27,

    justifyContent: "center",
    alignItems: "center",
  },
});
