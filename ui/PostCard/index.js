import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useAspectRatio } from "../../hooks";
import { useState } from "react";
import PostActionModal from "../PostActionModal";
import styles from "./styles";

const PostCard = ({ post, postDetailIsActive }) => {
  const { aspectRatio } = useAspectRatio(1, post);
  const navigation = useNavigation();

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const handleDelete = () => {
    toggleDrawer();
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
              <TouchableOpacity>
                <Image source={post.userImage} style={styles.headerImage} />
              </TouchableOpacity>

              <View>
                <Text style={styles.username}>{post.username}</Text>
                <Text style={styles.date}>{post.date}</Text>
              </View>
            </View>

            <View style={styles.actionBox}>
              {postDetailIsActive && (
                <TouchableOpacity style={styles.followBtn}>
                  <Text style={styles.followText}>Follow</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={toggleDrawer}>
                <Ionicons
                  name="ellipsis-vertical-sharp"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
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
              source={{ uri: post.postImage }}
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
              {post.postText}
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
              <TouchableOpacity>
                <Ionicons
                  name="heart-outline"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              <Text style={styles.metricCount}>{post.likesCount} Likes</Text>
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
                {post.commentCount} Comments
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
