import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Keyboard,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants";
import { PostCard, TextAreaInput } from "../../ui";
import { useHideKeyBoard, useSinglePost, useDeletePost } from "../../hooks";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import styles from "./styles";
import ErrorScreen from "../ErrorScreen";
import Loading from "../Loading";

const PostDetails = () => {
  const route = useRoute();

  const [comment, setComment] = useState("");
  const [commentIsFocused, setCommentIsFocused] = useState(false);

  const { isLoading, errorMessage, singlePost } = useSinglePost(
    "/post",
    route?.params?.post?.id
  );

  const { handlePostDelete } = useDeletePost();

  const deletePost = (page, postId) => {
    handlePostDelete(page, "/post", postId);
  };

  const commentIsValid = comment.trim().length > 0;

  useHideKeyBoard(setCommentIsFocused);

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
            <PostCard
              post={singlePost}
              postDetailIsActive
              deletePost={deletePost.bind(null, "PostDetails")}
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

export default PostDetails;
