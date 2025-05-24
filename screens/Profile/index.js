import { View, FlatList } from "react-native";
import { PostCard } from "../../ui";
import { COLORS, SIZES } from "../../constants";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { useAuth } from "../../store";
import Loading from "../Loading";
import ErrorScreen from "../ErrorScreen";
import TemplateScreen from "../TemplateScreen";
import { useFetch, useDeletePost } from "../../hooks";

const Profile = () => {
  const { setUserProfile, userData } = useAuth();
  const route = useRoute();
  const user = route?.params?.user;

  const {
    isLoading,
    errorMessage,
    data: userPosts,
    setData,
  } = useFetch(`/post/user?id=${user?.id}`);

  const { handlePostDelete } = useDeletePost();

  useEffect(() => {
    setUserProfile(user);
  }, [user]);

  const message = `${
    userData?.id === user?.id ? "You have" : user?.fullName + " has"
  } no post`;

  const deletePost = (page, postId) => {
    handlePostDelete(page, "/post", postId, setData);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : errorMessage ? (
        <ErrorScreen message={errorMessage} />
      ) : userPosts.length < 1 ? (
        <TemplateScreen message={message} />
      ) : (
        <View
          style={[
            SIZES.safeAreaView,
            {
              backgroundColor: COLORS.white,
              paddingTop: 28,
              paddingHorizontal: 10,
            },
          ]}
        >
          <FlatList
            data={userPosts}
            renderItem={({ item }) => (
              <PostCard
                post={item}
                deletePost={deletePost.bind(null, "profile")}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </>
  );
};

export default Profile;
