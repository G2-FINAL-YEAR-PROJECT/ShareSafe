import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { EmergencyPostCard, TextAreaInput, CommentCard } from "../../ui";
import {
  useHideKeyBoard,
  useSinglePost,
  useDeletePost,
  useComments,
} from "../../hooks";
import { useRoute } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Loading from "../Loading";
import ErrorScreen from "../ErrorScreen";
import { apiClient } from "../../config";
import { useAuth } from "../../store";
import styles from "./styles";

const EmergencyDetails = () => {
  const [comment, setComment] = useState("");
  const [commentIsFocused, setCommentIsFocused] = useState(false);

  const [uploadingComment, setUploadingComment] = useState(false);

  const { userData } = useAuth();

  const route = useRoute();
  const { post } = route.params;

  const { isLoading, errorMessage, singlePost } = useSinglePost(
    "/emergency",
    post?.id
  );

  const { loadingComment, setCommentList, commentList, commentError } =
    useComments("/emergency/comment", post?.id, singlePost);

  const { handlePostDelete } = useDeletePost();

  const deletePost = (page, postId) => {
    handlePostDelete(page, "/emergency", postId);
  };

  useHideKeyBoard(setCommentIsFocused);

  const commentIsValid = comment.trim().length > 0;

  const handleReply = async () => {
    setUploadingComment(true);
    try {
      const payload = {
        text: comment,
      };
      const res = await apiClient.post(
        `/emergency/comment/${post?.id}`,
        payload
      );
      // console.log(res.data);
      if (res.data?.status !== 200) {
        throw new Error(res.data?.message);
      }

      const { data } = res.data;

      const newComment = {
        entityType: data?.entityType,
        id: data?.id,
        emergencyId: data?.emergencyId,
        text: data?.text,
        user: {
          fullName: userData?.fullName,
          id: userData?.id,
          profilePicture: userData?.profilePicture,
        },
      };
      setUploadingComment(false);
      alert("commented successfully");
      setComment("");
      setCommentList((prev) => [...prev, newComment]);
      Keyboard.dismiss();
    } catch (error) {
      alert(error?.data?.message);
      setUploadingComment(false);
    } finally {
      setUploadingComment(false);
    }
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

        {!isLoading && loadingComment ? (
          <Loading />
        ) : commentError ? (
          <ErrorScreen message={commentError} />
        ) : (
          commentList && (
            <View style={{ rowGap: 8, paddingBottom: 200 }}>
              {commentList?.map((item) => (
                <CommentCard key={item?.id} comment={item} />
              ))}
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
              style={styles.replyBtn(commentIsValid, uploadingComment)}
              onPress={handleReply}
              disabled={!commentIsValid || uploadingComment}
            >
              {uploadingComment ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                <Text style={styles.replyText}>Reply</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
        {/* ADD COMMENT ACTION ENDS */}
      </View>
    </>
  );
};

export default EmergencyDetails;
