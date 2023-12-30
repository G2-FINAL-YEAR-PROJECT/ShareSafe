import { View, FlatList, Text } from "react-native";
import RecommendedItem from "../RecommendedItem";
import { useEffect, useState } from "react";
import { apiClient } from "../../config/axios";
// import { recommended } from "../../data";

const Recommended = () => {
  const [loading, setLoading] = useState(true);
  const [recommendedData, setRecommendedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await apiClient.get("/users/recommended");
      const data = res.data.data;
      setRecommendedData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ width: "100%", marginVertical: 30 }}>
      {!loading && (
        <>
          <Text style={{ fontSize: 12, fontFamily: "medium", marginBottom: 8 }}>Recommended</Text>
          <FlatList
            data={recommendedData}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <RecommendedItem item={item} />}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </View>
  );
};

export default Recommended;
