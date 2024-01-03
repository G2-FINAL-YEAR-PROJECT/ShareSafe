import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { EmergencyPostCard, TextAreaInput } from "../../ui";
import { useHideKeyBoard, useSinglePost, useDeletePost } from "../../hooks";
import { useRoute } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Loading from "../Loading";
import ErrorScreen from "../ErrorScreen";
import styles from "./styles";

const EmergencyDetails = () => {
  const [comment, setComment] = useState("");
  const [commentIsFocused, setCommentIsFocused] = useState(false);

  const route = useRoute();
  const { post } = route.params;

  const { isLoading, errorMessage, singlePost } = useSinglePost(
    "/emergency",
    post?.id
  );

  const { handlePostDelete } = useDeletePost();

  const deletePost = (page, postId) => {
    handlePostDelete(page, "/emergency", postId);
  };

  useHideKeyBoard(setCommentIsFocused);

  const commentIsValid = comment.trim().length > 0;

  const handleReply = () => {
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
        {isLoading ? (
          <Loading />
        ) : errorMessage ? (
          <ErrorScreen message={errorMessage} />
        ) : (
          singlePost && (
            <EmergencyPostCard
              post={singlePost}
              deletePost={deletePost.bind(null, "EmergencyDetails")}
              emergencyDetailIsActive
              forEmergency={true}
            />
          )
        )}
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          marginHorizontal: 10,
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
            <TouchableOpacity>
              <Ionicons
                name="camera-outline"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.replyBtn(commentIsValid)}
              onPress={handleReply}
              disabled={!commentIsValid}
            >
              <Text style={styles.replyText}>Reply</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* ADD COMMENT ACTION ENDS */}
      </View>
    </>
  );
};

export default EmergencyDetails;
