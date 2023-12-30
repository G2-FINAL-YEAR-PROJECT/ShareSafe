import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SIZES, COLORS } from "../../constants";
import { useHideKeyBoard } from "../../hooks";
import { TextAreaInput } from "../../ui";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import styles from "./styles";

const message = {
  id: "m1",
  username: "Fire Service",
  image: require("../../assets/images/fire_service.jpeg"),
  status: "online",
  time: "1 min ago",
  message:
    "If you have concerns related to personal safety or believe there is a threat, I strongly advise reaching out to the appropriate authorities or ",
};
const ChatDetails = () => {
  const [comment, setComment] = useState("");
  const [commentIsFocused, setCommentIsFocused] = useState(false);

  const route = useRoute();
  const { userId } = route.params;

  const commentIsValid = comment.trim().length > 0;

  useHideKeyBoard(setCommentIsFocused);

  const handleSend = () => {
    if (!commentIsValid) return;
    console.log(comment);

    setComment("");
    Keyboard.dismiss();
  };
  return (
    <>
      <ScrollView
        style={[
          SIZES.safeAreaView,
          { paddingTop: 8, backgroundColor: COLORS.white },
        ]}
      >
        <View style={styles.sendBox}>
          <Text style={[styles.text, styles.sentText]}>
            Hi Amy, How are you?
          </Text>
          <Image
            style={styles.image}
            source={require("../../assets/images/girl.jpg")}
          />
        </View>

        <View style={styles.receiveBox}>
          <Image style={styles.image} source={message.image} />
          <Text style={[styles.text, styles.receivedText]}>
            {message.message}
          </Text>
        </View>

        <View style={styles.sendBox}>
          <Text style={[styles.text, styles.sentText]}>
            Hi Amy, How are you?
          </Text>
          <Image
            style={styles.image}
            source={require("../../assets/images/girl.jpg")}
          />
        </View>

        <View style={styles.receiveBox}>
          <Image style={styles.image} source={message.image} />
          <Text style={[styles.text, styles.receivedText]}>
            {message.message}
          </Text>
        </View>
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
              <TouchableOpacity>
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
              </TouchableOpacity>
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
    </>
  );
};

export default ChatDetails;
