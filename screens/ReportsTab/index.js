import { View, FlatList } from "react-native";
import { emergencyList } from "../../data";
import { EmergencyPostCard } from "../../ui";
import { COLORS, SIZES } from "../../constants";
import Loading from "../Loading";
import ErrorScreen from "../ErrorScreen";
import TemplateScreen from "../TemplateScreen";
import { useAuth } from "../../store";
import { useFetch, useDeletePost } from "../../hooks";

const ReportsTab = () => {
  const { userProfile, userData } = useAuth();

  const {
    isLoading,
    errorMessage,
    data: userReports,
    setData,
  } = useFetch(`/emergency/user?id=${userProfile.id}`);

  const { handlePostDelete } = useDeletePost();

  const deletePost = (page, postId) => {
    handlePostDelete(page, "/emergency", postId, setData);
  };

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
            },
          ]}
        >
          <FlatList
            data={userReports}
            renderItem={({ item }) => (
              <EmergencyPostCard
                post={item}
                deletePost={deletePost.bind(null, "profileReport")}
                forEmergency={true}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </>
  );
};

export default ReportsTab;
