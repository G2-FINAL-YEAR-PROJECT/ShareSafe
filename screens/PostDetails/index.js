import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants";
import { PostCard } from "../../ui";
import React from "react";

const PostDetails = () => {
  const route = useRoute();
  const { post } = route.params;

  return (
    <View
      style={[
        SIZES.safeAreaView,
        { paddingTop: 8, backgroundColor: COLORS.white },
      ]}
    >
      <PostCard post={post} postDetailIsActive />
    </View>
  );
};

export default PostDetails;
