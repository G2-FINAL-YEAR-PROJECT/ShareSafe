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
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import styles from "./styles";
import { getProfilePic } from "../../helpers";
import { useHomeContext } from "../../store/HomeContext";

const ChatDetails = () => {
  const route = useRoute();
  const { messageItem } = route.params; // Current/selected chat message object
  const { messagesList, setMessagesList } = useHomeContext();

  const [comment, setComment] = useState("");
  const [commentIsFocused, setCommentIsFocused] = useState(false);
  useHideKeyBoard(setCommentIsFocused);
  const commentIsValid = comment.trim().length > 0;

  const messagesWithUser = messagesList.filter(
    (message) => message.targetUser.id === messageItem.targetUser.id
  );

  const handleSend = () => {
    if (!commentIsValid) return;
    console.log(comment);

    setComment("");
    Keyboard.dismiss();
  };
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
              <Image
                style={styles.image}
                source={getProfilePic(message.currentUser.profilePicture)}
              />
            </View>
          ) : (
            <View style={styles.receiveBox} key={message.id}>
              <Image
                style={styles.image}
                source={getProfilePic(message.targetUser.image)}
              />
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
