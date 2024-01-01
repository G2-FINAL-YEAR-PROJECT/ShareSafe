import { View, FlatList, Text } from "react-native";
import { postList } from "../../data";
import { PostCard } from "../../ui";
import { COLORS, SIZES } from "../../constants";
import { useFetch, useDeletePost } from "../../hooks";
import ErrorScreen from "../ErrorScreen";
import Loading from "../Loading";
import { apiClient } from "../../config";

const Home = () => {
  const {
    isLoading,
    errorMessage,
    data: allPosts,
    setData,
  } = useFetch("/post");

  const { handlePostDelete } = useDeletePost();

  const deletePost = (page, postId) => {
    // try {
    //   const res = await apiClient.delete(`/post/${postId}`);

    //   console.log(res.data.message);
    //   if (res.data.status === 200) {
    //     alert("post deleted successfully");
    //     setData((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    //   }

    //   if (res.data.status !== 200) {
    //     throw new Error(res.data.message);
    //   }
    // } catch (error) {
    //   alert("Error deleting post");
    //   console.log(error.message);
    // }

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
