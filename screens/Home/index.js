import { View, FlatList } from "react-native";
import { postList } from "../../data";
import { PostCard } from "../../ui";
import { COLORS, SIZES } from "../../constants";

const Home = () => {
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

export default Home;
