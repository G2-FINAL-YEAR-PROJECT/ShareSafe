import { View, FlatList } from "react-native";
import { emergencyList } from "../../data";
import { EmergencyPostCard } from "../../ui";
import { COLORS, SIZES } from "../../constants";
import Loading from "../Loading";
import ErrorScreen from "../ErrorScreen";
import TemplateScreen from "../TemplateScreen";
import { useAuth } from "../../store";
import { useFetch } from "../../hooks";

const ReportsTab = () => {
  const { userProfile, userData } = useAuth();

  const {
    isLoading,
    errorMessage,
    data: userReports,
  } = useFetch(`/emergency/user?id=${userProfile.id}`);

  const message = `${
    userData?.id === userProfile?.id
      ? "You have"
      : userProfile?.fullName + " has"
  } no report`;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : errorMessage ? (
        <ErrorScreen message={errorMessage} />
      ) : userReports.length < 1 ? (
        <TemplateScreen message={message} />
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
