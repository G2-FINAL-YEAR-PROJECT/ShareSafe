import {
  ScrollView,
  Text,
  BackHandler,
  Alert,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TextAreaInput } from "../../ui";
import { useEffect, useState, useCallback } from "react";
import styles from "./styles";

const userImage = require("../../assets/images/girl.jpg");
const CreatePost = () => {
  const navigation = useNavigation();
  const [comment, setComment] = useState("");

  const commentIsValid = comment.trim().length > 0;

  const handleBackPress = () => {
    if (!commentIsValid) {
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
  }, [navigation, commentIsValid]);

  return (
    <>
      <TouchableOpacity onPress={handleBackPress} style={[styles.cancel]}>
        <Ionicons name="close-circle-outline" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView
        style={[
          SIZES.safeAreaView,
          { backgroundColor: COLORS.white, paddingTop: 115 },
        ]}
      >
        <View style={styles.userBox}>
          <View style={styles.user}>
            <Image style={styles.image} source={userImage} />
            <View>
              <Text style={styles.textStyle(16, COLORS.black2, "semibold")}>
                Miko
              </Text>
              <Text
                style={[
                  styles.textStyle(10, COLORS.gray8, "medium"),
                  { marginTop: -5 },
                ]}
              >
                24th September 2023
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.postBtn(commentIsValid)}
            disabled={!commentIsValid}
          >
            <Text style={styles.postText}>Post</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 25 }}>
          <TextAreaInput
            value={comment}
            placeholder="What do you want to talk about?"
            hideBorder
            numberOfLines={40}
            height={320}
            padding={0}
            handleChange={(text) => setComment(text)}
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={[styles.media, styles.camera]}>
        <Ionicons name="camera" size={24} color={COLORS.white} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.media, styles.gallery]}>
        <Ionicons name="images-outline" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </>
  );
};

export default CreatePost;
