import { View, FlatList } from "react-native";
import { useState } from "react";
import { EmergencyPostCard, SearchInput } from "../../../ui";
import { COLORS, SIZES } from "../../../constants";
import { useFetch, useDeletePost } from "../../../hooks";
import Loading from "../../Loading";
import ErrorScreen from "../../ErrorScreen";

const Emergencies = () => {
  const [searchString, setSearchString] = useState("");
  const [inputIsFocused, setInputIsFocused] = useState(false);

  const {
    data: allEmergencies,
    isLoading,
    errorMessage,
    setData,
  } = useFetch("/emergency");

  const { handlePostDelete } = useDeletePost();

  const deletePost = (page, postId) => {
    handlePostDelete(page, "/emergency", postId, setData);
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
              paddingBottom: 90,
            },
          ]}
        >
          <View style={{ marginBottom: 30 }}>
            <SearchInput
              value={searchString}
              placeholder="Search emergencies"
              inputIsFocused={inputIsFocused}
              handleChange={(text) => setSearchString(text)}
              handleFocus={() => setInputIsFocused(true)}
              handleBlur={() => setInputIsFocused(false)}
            />
          </View>

          <FlatList
            data={allEmergencies}
            renderItem={({ item }) => (
              <EmergencyPostCard
                post={item}
                deletePost={deletePost.bind(null, "emergencies")}
                forEmergency={true}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </>
  );
};

export default Emergencies;
