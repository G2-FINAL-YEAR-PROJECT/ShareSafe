import { View, FlatList } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { useAuth } from "../../store";
import Loading from "../Loading";
import ErrorScreen from "../ErrorScreen";
import { useFetch } from "../../hooks";
import { PostCard } from "../../ui";
import TemplateScreen from "../TemplateScreen";

const LikesTab = () => {
  const { userProfile, userData } = useAuth();

  const {
    isLoading,
    errorMessage,
    data: likedPosts,
  } = useFetch(`/post/user/likes?id=${userProfile.id}`);

  const message = `${
    userData?.id === userProfile?.id
      ? "You have"
      : userProfile?.fullName + " has"
  } no liked post`;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : errorMessage ? (
        <ErrorScreen message={errorMessage} />
      ) : likedPosts.length < 1 ? (
        <TemplateScreen message={message} />
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
            data={likedPosts}
            renderItem={({ item }) => <PostCard post={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </>
  );
};

export default LikesTab;
