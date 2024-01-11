import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import { SIZES, COLORS } from "../../constants";
import { useHideKeyBoard } from "../../hooks";
import { TextAreaInput } from "../../ui";
// import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import styles from "./styles";
import { useAuth } from "../../store";
import { getProfilePic } from "../../helpers";
import { useHomeContext } from "../../store/HomeContext";
import { apiClient } from "../../config";

const ChatDetails = ({ navigation }) => {
  const route = useRoute();
  const { targetUser } = route.params;
  const [messageItem, setMessageItem] = useState(route.params.messageItem);
  const { messagesList, setMessagesList, socket } = useHomeContext();
  const { userData } = useAuth();

  const [comment, setComment] = useState("");
  const [commentIsFocused, setCommentIsFocused] = useState(false);
  useHideKeyBoard(setCommentIsFocused);
  const commentIsValid = comment.trim().length > 0;

  const messagesWithUser = messagesList.filter(
    (message) => message?.targetUser?.id === messageItem?.targetUser?.id
  );

  const handleSend = async () => {
    if (!commentIsValid) return;
    Keyboard.dismiss();

    // API request
    const res = await apiClient.post("/message/send", {
      receiver: messageItem.targetUser.id,
      message: comment,
    });

    const newMessage = {
      createdAt: new Date().toJSON(),
      currentUser: messageItem.currentUser,
      targetUser: messageItem.targetUser,
      sentByCurrentUser: true,
      id: Math.floor(Math.random() * 9999),
      message: comment,
    };
    setMessagesList([newMessage, ...messagesList]);
    // console.log("newMessage:", newMessage);

    // Reset
    setComment("");
  };

  const goToProfile = (userInfo) => {
    navigation.navigate("ProfileTabStack", {
      screen: "Profile",
      params: { user: userInfo },
    });
  };

  useEffect(() => {
    if (!messageItem?.targetUser.id) {
      // Create new message item object
      const _messageItem = {
        currentUser: {
          fullName: userData?.fullName,
          id: userData?.id,
          profilePicture: userData?.profilePicture,
        },
        targetUser: {
          fullName: targetUser?.fullName,
          id: targetUser?.id,
          profilePicture: targetUser?.profilePicture,
        },
      };
      setMessageItem(_messageItem);
      // console.log("messageItem:", messageItem, _messageItem);
    }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        style={[
          SIZES.safeAreaView,
          {
            paddingTop: 0,
            marginBottom: 105,
            backgroundColor: COLORS.white,
          },
        ]}
      >
        {messagesWithUser.reverse().map((message) =>
          message.sentByCurrentUser ? (
            <View style={styles.sendBox} key={message.id}>
              <Text style={[styles.text, styles.sentText]}>
                {message.message}
              </Text>
              <TouchableOpacity
                onPress={() => goToProfile(message.currentUser)}
              >
                <Image
                  style={styles.image}
                  source={getProfilePic(message.currentUser.profilePicture)}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.receiveBox} key={message.id}>
              <TouchableOpacity onPress={() => goToProfile(message.targetUser)}>
                <Image
                  style={styles.image}
                  source={getProfilePic(message.targetUser.image)}
                />
              </TouchableOpacity>
              <Text style={[styles.text, styles.receivedText]}>
                {message.message}
              </Text>
            </View>
          )
        )}
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          marginHorizontal: 18,
          marginVertical: 10,
        }}
      >
        <TextAreaInput
          value={comment}
          inputIsFocused={commentIsFocused}
          placeholder="Type your reply"
          borderColor={COLORS.primary}
          numberOfLines={40}
          height={90}
          handleChange={(text) => setComment(text)}
          handleFocus={() => setCommentIsFocused(true)}
          handleBlur={() => setCommentIsFocused(false)}
        />

        {/* ADD COMMENT ACTION STARTS */}
        {commentIsFocused && (
          <View style={styles.actionBox}>
            <View style={styles.mediaAction}>
              {/* <TouchableOpacity>
                <Ionicons
                  name="camera-outline"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Ionicons
                  name="attach-sharp"
                  size={22}
                  color={COLORS.primary}
                  style={{ transform: [{ rotate: "45deg" }] }}
                />
              </TouchableOpacity> */}
            </View>

            <TouchableOpacity
              style={styles.replyBtn(commentIsValid)}
              onPress={handleSend}
              disabled={!commentIsValid}
            >
              <Text style={styles.replyText}>Send</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* ADD COMMENT ACTION ENDS */}
      </View>
    </View>
  );
};

export default ChatDetails;
