import { View, FlatList } from "react-native";

import { PostCard } from "../../ui";
import { COLORS, SIZES } from "../../constants";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { useAuth } from "../../store";
import Loading from "../Loading";
import ErrorScreen from "../ErrorScreen";
import { useFetch } from "../../hooks";

const Profile = () => {
  const { setUserProfile } = useAuth();
  const route = useRoute();
  const user = route?.params?.user;

  const { isLoading, errorMessage, data: userPosts } = useFetch("/post/user");

  useEffect(() => {
    setUserProfile(user);
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : errorMessage ? (
        <ErrorScreen message={errorMessage} />
      ) : (
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
            data={userPosts}
            renderItem={({ item }) => <PostCard post={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </>
  );
};

export default Profile;
