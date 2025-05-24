import { View, FlatList, Text, ActivityIndicator } from "react-native";
import RecommendedItem from "../RecommendedItem";
import { useEffect, useState } from "react";
import { apiClient } from "../../config/axios";
import { useAuth } from "../../store";
import { COLORS } from "../../constants";

const Recommended = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [recommendedData, setRecommendedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const { userData, token } = useAuth();

  const fetchData = async () => {
    try {
      const res = await apiClient.get("/users/recommended");

      if (res.data.status !== 200) {
        throw new Error(res.data.message);
      }
      const data = res.data.data;
      const filteredData = data?.filter((user) => user?.id !== userData?.id);
      setRecommendedData(filteredData);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ width: "100%", marginVertical: 30 }}>
      {loading ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="small" color={COLORS.primary} />
        </View>
      ) : errorMessage ? (
        <Text
          style={{
            fontSize: 12,
            fontFamily: "semibold",
            color: COLORS.red,
            textAlign: "center",
          }}
        >
          {errorMessage}
        </Text>
      ) : (
        <>
          <Text style={{ fontSize: 12, fontFamily: "medium", marginBottom: 8 }}>
            Recommended
          </Text>
          <FlatList
            data={recommendedData}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <RecommendedItem user={item} />}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </View>
  );
};

export default Recommended;
