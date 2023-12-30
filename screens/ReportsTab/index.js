import { View, FlatList } from "react-native";
import { emergencyList } from "../../data";
import { EmergencyPostCard } from "../../ui";
import { COLORS, SIZES } from "../../constants";
import Loading from "../Loading";
import ErrorScreen from "../ErrorScreen";
import { useAuth } from "../../store";
import { useFetch } from "../../hooks";

const ReportsTab = () => {
  const { userProfile } = useAuth();

  const {
    isLoading,
    errorMessage,
    data: userReports,
  } = useFetch("/emergency/user");

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
              paddingBottom: 90,
            },
          ]}
        >
          <FlatList
            data={userReports}
            renderItem={({ item }) => <EmergencyPostCard post={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </>
  );
};

export default ReportsTab;
