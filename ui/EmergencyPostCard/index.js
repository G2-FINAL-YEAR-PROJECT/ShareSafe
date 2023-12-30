import { View, Text, Image, TouchableOpacity } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useAspectRatio } from "../../hooks";
import { abbreviateNumber } from "js-abbreviation-number";
import { formatDate, formatTime } from "../../helpers";
import PostActionModal from "../PostActionModal";
import { useState } from "react";
import { useAuth } from "../../store";
import styles from "./styles";

const lasema = require("../../assets/images/lasema.png");
const police = require("../../assets/images/ng_police.jpg");

const EmergencyPostCard = ({ post, emergencyDetailIsActive }) => {
  const navigation = useNavigation();
  const { aspectRatio } = useAspectRatio(1, post);

  const { userData } = useAuth();

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const [status, setStatus] = useState(
    post?.status?.toLowerCase() || "pending"
  );
  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const handlePostAction = (type) => {
    setStatus(type);
    toggleDrawer();
  };

  const handleDelete = () => {
    toggleDrawer();
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
              <Image
                source={post?.user?.image ? { uri: post?.user?.image } : police}
                style={styles.userImage}
              />
              <Text style={styles.username} numberOfLines={1}>
                {post.username}
              </Text>
            </View>

            <View style={styles.actionBox}>
              <TouchableOpacity>
                <Image source={lasema} style={styles.respondent} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.followBtn}>
                <Text style={styles.followText}>Follow</Text>
              </TouchableOpacity>

              {(userData?.id === post?.user?.id ||
                userData?.id === post?.channel) && (
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
          {/* POST IMAGE ENDS */}

          {/* DATE AND STATUS STARTS */}
          <View style={styles.statusBox}>
            <Text style={styles.date}>
              posted on {formatDate(post?.user?.createdAt)} |{" "}
              {formatTime(post?.user?.createdAt)}
            </Text>

            {status === "pending" && (
              <TouchableOpacity style={styles.awaiting}>
                <Text style={[styles.statusText, { color: COLORS.aConText }]}>
                  {status}
                </Text>
              </TouchableOpacity>
            )}

            {status === "confirmed" && (
              <TouchableOpacity style={styles.confirmed}>
                <Text style={[styles.statusText, { color: COLORS.conText }]}>
                  {status}
                </Text>
              </TouchableOpacity>
            )}

            {status === "responding" && (
              <TouchableOpacity style={styles.responding}>
                <Text
                  style={[styles.statusText, { color: COLORS.respondText }]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            )}

            {status === "resolved" && (
              <TouchableOpacity style={styles.resolved}>
                <Text
                  style={[styles.statusText, { color: COLORS.resolveText }]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            )}

            {status === "dismissed" && (
              <TouchableOpacity style={styles.dismiss}>
                <Text
                  style={[styles.statusText, { color: COLORS.dismissText }]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* DATE AND STARTS */}

          {/* POST INTERACTION STARTS */}
          <View style={styles.intBox}>
            <View style={styles.metricBox}>
              <TouchableOpacity>
                <Entypo name="arrow-up" size={24} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.voteCount}>
                {abbreviateNumber(post?.upVotes, 2)}
              </Text>
              <TouchableOpacity>
                <Entypo name="arrow-down" size={24} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.voteCount}>
                {abbreviateNumber(post?.downVotes, 2)}
              </Text>
            </View>

            <View style={styles.commentBox}>
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
        handlePostAction={(type) => handlePostAction(type)}
        handleDelete={handleDelete}
        toggleDrawer={toggleDrawer}
        forEmergency
        posterId={post?.user?.id}
        userData={userData}
      />
    </>
  );
};

export default EmergencyPostCard;
