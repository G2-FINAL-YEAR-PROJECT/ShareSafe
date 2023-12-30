import { View, FlatList, Text } from "react-native";
import { postList } from "../../data";
import { PostCard } from "../../ui";
import { COLORS, SIZES } from "../../constants";
import { useFetch } from "../../hooks";
import ErrorScreen from "../ErrorScreen";
import Loading from "../Loading";

const Home = () => {
  const { isLoading, errorMessage, data: allPosts } = useFetch("/post");

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
            renderItem={({ item }) => <PostCard post={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </>
  );
};

export default Home;
