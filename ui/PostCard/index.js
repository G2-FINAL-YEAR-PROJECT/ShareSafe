import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useAspectRatio, useFollow } from "../../hooks";
import { useState } from "react";
import PostActionModal from "../PostActionModal";
import { formatDate } from "../../helpers";
import { abbreviateNumber } from "js-abbreviation-number";
import { useAuth } from "../../store";
import { apiClient } from "../../config";
import styles from "./styles";

const PostCard = ({ post, postDetailIsActive, deletePost }) => {
  const { aspectRatio } = useAspectRatio(1, post);
  const navigation = useNavigation();

  const { token, userData } = useAuth();

  const { isFollowing, handleFollowUser } = useFollow();

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [likedByUser, setLikedByUser] = useState(
    post?.likedBy?.includes(userData?.id)
  );
  const [errorMessage, setErrorMessage] = useState("");

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const handleDelete = () => {
    toggleDrawer();
    deletePost(post?.id);
  };

  const handlePostInteraction = async (postId) => {
    let res;
    try {
      if (likedByUser) {
        console.log("unlike", likedByUser);
        res = await apiClient.put(`/post/unLike/${postId}`);
        setLikedByUser((prev) => !prev);
      } else {
        console.log("like", likedByUser);
        res = await apiClient.put(`/post/like/${postId}`);
        setLikedByUser(res.data.data?.likedBy?.includes(userData?.id));
      }

      console.log(res.data);

      if (res.data.status !== 200) {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log("error", error.message);
      setErrorMessage;
    }
  };

  return (
    <>
      <TouchableOpacity
        style={{
          borderRadius: 5,
          borderWidth: 1,
          borderColor: COLORS.gray,
          marginBottom: 20,
        }}
        onPress={() => navigation.navigate("PostDetails", { post })}
      >
        <View style={styles.cardBox}>
          {/* USERNAME AND DATE */}
          <View style={styles.header}>
            <View style={styles.userBox}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProfileTabStack", {
                    screen: "Profile",
                    params: { user: post?.user },
                  })
                }
              >
                <Image
                  source={{ uri: post?.user?.profilePicture }}
                  style={styles.headerImage}
                />
              </TouchableOpacity>

              <View>
                <Text style={styles.username}>{post?.user?.fullName}</Text>
                <Text style={styles.date}>{formatDate(post?.createdAt)}</Text>
              </View>
            </View>

            <View style={styles.actionBox}>
              {postDetailIsActive &&
                userData?.id !== post?.user?.id &&
                !post?.user?.followers?.includes(userData?.id) &&
                !isFollowing && (
                  <TouchableOpacity
                    style={styles.followBtn}
                    onPress={() => handleFollowUser(post?.user?.id)}
                  >
                    <Text style={styles.followText}>Follow</Text>
                  </TouchableOpacity>
                )}

              {userData?.id === post?.user?.id && (
                <TouchableOpacity onPress={toggleDrawer}>
                  <Ionicons
                    name="ellipsis-vertical-sharp"
                    size={24}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/* USERNAME AND DATE ends */}

          <View
            style={{
              marginTop: 6,
              width: "100%",
              overflow: "hidden",
              aspectRatio: aspectRatio,
            }}
          >
            <Image
              source={{ uri: post?.thumbnail }}
              style={styles.postImage}
              resizeMode="contain"
            />
          </View>

          {/* POST DESCRIPTION */}
          <View>
            <Text
              style={styles.postText}
              numberOfLines={postDetailIsActive ? 0 : 2}
            >
              {post?.text}
            </Text>

            {postDetailIsActive ? null : (
              <TouchableOpacity
                onPress={() => navigation.navigate("PostDetails", { post })}
              >
                <Text style={styles.seeMore}>See More</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* POST DESCRIPTION ends */}

          {/* POST INTERACTION */}
          <View style={styles.intBox}>
            <View style={styles.metricBox}>
              <TouchableOpacity onPress={() => handlePostInteraction(post?.id)}>
                <Ionicons
                  name={likedByUser ? "heart" : "heart-outline"}
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              <Text style={styles.metricCount}>
                {abbreviateNumber(post?.likes, 2)} Likes
              </Text>
            </View>

            <View style={styles.metricBox}>
              <TouchableOpacity>
                <Ionicons
                  name="ios-chatbox-outline"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              <Text style={styles.metricCount}>
                {abbreviateNumber(post?.commentCount, 2)}{" "}
                {post?.commentCount > 1 ? "Comments" : "Comment"}
              </Text>
            </View>

            <View>
              <TouchableOpacity>
                <Ionicons
                  name="md-share-social-outline"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* POST INTERACTION ENDS */}
        </View>
      </TouchableOpacity>

      <PostActionModal
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default PostCard;
