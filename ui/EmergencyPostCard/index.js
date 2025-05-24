import { View, Text, Image, TouchableOpacity } from "react-native";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useAspectRatio, useFollow } from "../../hooks";
import { abbreviateNumber } from "js-abbreviation-number";
import { formatDate, formatTime } from "../../helpers";
import PostActionModal from "../PostActionModal";
import { useState } from "react";
import { useAuth } from "../../store";
import { apiClient } from "../../config";
import { capitalize } from "../../helpers";
import styles from "./styles";

const placeholder = require("../../assets/images/placeholder.jpg");
const oops = require("../../assets/images/oops.jpg");

const EmergencyPostCard = ({
  post,
  deletePost,
  emergencyDetailIsActive,
  forEmergency,
}) => {
  const { userData } = useAuth();

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [status, setStatus] = useState(post?.status);
  const [upVoted, setUpVoted] = useState(
    post?.upVotedBy?.includes(userData?.id)
  );
  const [downVoted, setDownVoted] = useState(
    post?.downVotedBy?.includes(userData?.id)
  );
  const [upVoteCount, setUpVoteCount] = useState(post?.upVotes);
  const [downVoteCount, setDownVoteCount] = useState(post?.downVotes);

  const navigation = useNavigation();
  const { aspectRatio } = useAspectRatio(1, post);

  const { isFollowing, handleFollowUser } = useFollow();

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const handleStatusUpdate = async (type) => {
    toggleDrawer();
    try {
      const res = await apiClient.put(`/emergency/${post?.id}`, {
        status: type,
      });
      if (res.data.status !== 200) {
        throw new Error("STATUS UPDATE FAILED!!!");
      }

      setStatus(res.data?.data?.status);

      alert("STATUS UPDATE SUCCESSFUL");
    } catch (error) {
      toggleDrawer();
      alert(error?.message);
    }
  };

  const handleDelete = () => {
    toggleDrawer();
    deletePost(post?.id);
  };

  const handleVote = async (type) => {
    try {
      const res = await apiClient.put(`/emergency/${type}/${post.id}`);

      if (res.data.status !== 200) {
        throw new Error(res.data.message);
      }

      const { data } = res.data;
      setUpVoted(data?.upVotedBy?.includes(userData?.id));
      setDownVoted(data?.downVotedBy?.includes(userData?.id));
      setUpVoteCount(data?.upVotes);
      setDownVoteCount(data?.downVotes);
    } catch (error) {
      alert(error?.message);
      console.log(error?.message);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={{ marginBottom: 20 }}
        onPress={() => navigation.navigate("EmergencyDetails", { post })}
      >
        <View style={styles.cardBox}>
          {/* HEADER STARTS */}
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
                  source={
                    post?.user?.profilePicture
                      ? { uri: post?.user?.profilePicture }
                      : placeholder
                  }
                  style={styles.userImage}
                />
              </TouchableOpacity>

              <Text style={styles.username} numberOfLines={1}>
                {post?.user?.fullName}
              </Text>
            </View>

            <View style={styles.actionBox}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProfileTabStack", {
                    screen: "Profile",
                    params: { user: post?.channel },
                  })
                }
              >
                <Image
                  source={
                    post?.channel?.profilePicture
                      ? { uri: post?.channel?.profilePicture }
                      : placeholder
                  }
                  style={styles.respondent}
                />
              </TouchableOpacity>

              {emergencyDetailIsActive &&
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

              {(userData?.id === post?.user?.id ||
                userData?.id === post?.channel?.id) && (
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
          {/* HEADER ENDS */}

          {/* DESCRIPTION STARTS */}
          <View style={{ marginTop: 20 }}>
            <Text
              style={styles.postText}
              numberOfLines={emergencyDetailIsActive ? 0 : 3}
            >
              {post?.description}
            </Text>

            {emergencyDetailIsActive ? null : (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EmergencyDetails", { post })
                }
              >
                <Text style={styles.showMore}>Show more</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* DESCRIPTION ENDS */}

          {/* POST IMAGE STARTS */}
          {post?.file && (
            <View
              style={{
                marginTop: 15,
                width: "100%",
                overflow: "hidden",
                aspectRatio: aspectRatio,
              }}
            >
              <Image
                source={{ uri: post?.file }}
                style={styles.postImage}
                resizeMode="contain"
              />
            </View>
          )}
          {/* POST IMAGE ENDS */}

          {/* DATE AND STATUS STARTS */}
          <View style={styles.statusBox}>
            <Text style={styles.date}>
              posted on {formatDate(post?.user?.createdAt)} |{" "}
              {formatTime(post?.user?.createdAt)}
            </Text>

            {status === "PENDING" && (
              <TouchableOpacity style={styles.awaiting}>
                <Text style={[styles.statusText, { color: COLORS.aConText }]}>
                  {capitalize(status)}
                </Text>
              </TouchableOpacity>
            )}

            {status === "CONFIRMED" && (
              <TouchableOpacity style={styles.confirmed}>
                <Text style={[styles.statusText, { color: COLORS.conText }]}>
                  {capitalize(status)}
                </Text>
              </TouchableOpacity>
            )}

            {status === "RESPONDING" && (
              <TouchableOpacity style={styles.responding}>
                <Text
                  style={[styles.statusText, { color: COLORS.respondText }]}
                >
                  {capitalize(status)}
                </Text>
              </TouchableOpacity>
            )}

            {status === "RESOLVED" && (
              <TouchableOpacity style={styles.resolved}>
                <Text
                  style={[styles.statusText, { color: COLORS.resolveText }]}
                >
                  {capitalize(status)}
                </Text>
              </TouchableOpacity>
            )}

            {status === "DISMISSED" && (
              <TouchableOpacity style={styles.dismiss}>
                <Text
                  style={[styles.statusText, { color: COLORS.dismissText }]}
                >
                  {capitalize(status)}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* DATE AND STARTS */}

          {/* POST INTERACTION STARTS */}
          <View style={styles.intBox}>
            <View style={styles.metricBox}>
              <TouchableOpacity onPress={() => handleVote("upvote")}>
                <MaterialCommunityIcons
                  name={upVoted ? "arrow-up-bold" : "arrow-up-bold-outline"}
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              <Text style={styles.voteCount}>
                {abbreviateNumber(upVoteCount, 2)}
              </Text>

              <TouchableOpacity onPress={() => handleVote("downVote")}>
                <MaterialCommunityIcons
                  name={
                    downVoted ? "arrow-down-bold" : "arrow-down-bold-outline"
                  }
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              <Text style={styles.voteCount}>
                {abbreviateNumber(downVoteCount, 2)}
              </Text>
            </View>

            <View style={styles.commentBox}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EmergencyDetails", { post })
                }
              >
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
        handleStatusUpdate={(type) => handleStatusUpdate(type)}
        handleDelete={handleDelete}
        toggleDrawer={toggleDrawer}
        forEmergency={forEmergency}
        posterId={post?.user?.id}
        userData={userData}
        post={post}
      />
    </>
  );
};

export default EmergencyPostCard;
