import { View, FlatList } from "react-native";
import { postList } from "../../data";
import { PostCard } from "../../ui";
import { COLORS, SIZES } from "../../constants";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { useAuth } from "../../store";

const Profile = () => {
  const { setUserProfile } = useAuth();
  const route = useRoute();
  const user = route?.params?.user;

  useEffect(() => {
    setUserProfile(user);
  }, [user]);

  return (
    <View
      style={[
        SIZES.safeAreaView,
        {
          backgroundColor: COLORS.white,
          paddingTop: 28,
          paddingHorizontal: 10,
          paddingBottom: 90,
        },
      ]}
    >
      <FlatList
        data={postList}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Profile;
