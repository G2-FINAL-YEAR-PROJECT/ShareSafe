import { View, FlatList } from "react-native";
import { PostCard } from "../../ui";
import { COLORS, SIZES } from "../../constants";
import { useFetch, useDeletePost } from "../../hooks";
import ErrorScreen from "../ErrorScreen";
import Loading from "../Loading";

const Home = () => {
  const {
    isLoading,
    errorMessage,
    data: allPosts,
    setData,
  } = useFetch("/post");

  const { handlePostDelete } = useDeletePost();

  const deletePost = (page, postId) => {
    handlePostDelete(page, "/post", postId, setData);
  };

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
            data={allPosts}
            renderItem={({ item }) => (
              <PostCard
                post={item}
                deletePost={deletePost.bind(null, "home")}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </>
  );
};

export default Home;
