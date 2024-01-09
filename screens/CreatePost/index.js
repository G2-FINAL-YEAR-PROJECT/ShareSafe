import {
  ScrollView,
  Text,
  BackHandler,
  Alert,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TextAreaInput } from "../../ui";
import { useEffect, useState } from "react";
import { uploadToCloudinary, formatDate } from "../../helpers";
import { useAuth } from "../../store";
import styles from "./styles";
import { apiClient } from "../../config";
import { usePickImage } from "../../hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";

const placeholder = require("../../assets/images/placeholder.jpg");

const CreatePost = ({ route }) => {
  const navigation = useNavigation();
  const [comment, setComment] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { userData } = useAuth();

  const postIsValid = comment.trim().length > 0 && previewImage?.length > 0;

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

  useEffect(() => {
    setPreviewImage(route?.params?.imageUri);
  }, [route?.params?.imageUri]);

  const { pickImage } = usePickImage(setPreviewImage);

  const handlePost = async () => {
    setIsLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(previewImage);

      const res = await apiClient.post("/post", {
        text: comment,
        thumbnail: imageUrl,
      });

      if (res.data.status !== 200) {
        throw new Error(res.data.message);
      }

      alert("upload success");
      setComment("");
      setPreviewImage(null);
      setIsLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      alert(`"ERRRROR", ${error?.message}`);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackPress = () => {
    if (!postIsValid) {
      navigation.goBack();
      return;
    }
    Alert.alert(
      "Close",
      "Are you sure you want stop this process?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setComment("");
            setPreviewImage(null);
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );

    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => {
      backHandler.remove();
    };
  }, [navigation, postIsValid]);

  return (
    <>
      <TouchableOpacity onPress={handleBackPress} style={[styles.cancel]}>
        <Ionicons name="close-circle-outline" size={24} color="black" />
      </TouchableOpacity>

      <ScrollView
        style={[
          SIZES.safeAreaView,
          {
            backgroundColor: COLORS.white,
            paddingTop: 115,
            paddingBottom: 300,
          },
        ]}
      >
        <View style={styles.userBox}>
          <View style={styles.user}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProfileTabStack", {
                  screen: "Profile",
                  params: { user: userInfo },
                })
              }
            >
              <Image
                style={styles.image}
                source={
                  userInfo?.profilePicture
                    ? { uri: userInfo?.profilePicture }
                    : placeholder
                }
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.textStyle(16, COLORS.black2, "semibold")}>
                {userInfo?.fullName}
              </Text>
              <Text
                style={[
                  styles.textStyle(10, COLORS.gray8, "medium"),
                  { marginTop: -5 },
                ]}
              >
                {formatDate(new Date())}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.postBtn(postIsValid, isLoading)}
            disabled={!postIsValid || isLoading}
            onPress={handlePost}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Text style={styles.postText}>Post</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 25 }}>
          <TextAreaInput
            value={comment}
            placeholder="What do you want to talk about?"
            hideBorder
            numberOfLines={40}
            height={200}
            padding={0}
            handleChange={(text) => setComment(text)}
          />
        </View>

        {previewImage && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: previewImage }}
              style={{ width: "100%", height: 500, borderRadius: 10 }}
            />

            <TouchableOpacity
              style={styles.closeImage}
              onPress={() => setPreviewImage(null)}
            >
              <Ionicons
                name="close-circle-outline"
                size={35}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={[styles.media, styles.camera]}
        onPress={() =>
          navigation.navigate("CameraScreen", { from: "CreatePost" })
        }
      >
        <Ionicons name="camera" size={24} color={COLORS.white} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.media, styles.gallery]}
        onPress={pickImage}
      >
        <Ionicons name="images-outline" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </>
  );
};

export default CreatePost;
