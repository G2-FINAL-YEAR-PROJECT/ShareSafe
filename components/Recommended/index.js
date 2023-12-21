import { View, FlatList, Text } from "react-native";
import { RecommendedItem } from "../../ui";
import { recommended } from "../../data";

const Recommended = () => {
  return (
    <View style={{ width: "100%", marginVertical: 30 }}>
      <Text style={{ fontSize: 12, fontFamily: "medium", marginBottom: 8 }}>
        Recommended
      </Text>
      <FlatList
        data={recommended}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <RecommendedItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Recommended;
