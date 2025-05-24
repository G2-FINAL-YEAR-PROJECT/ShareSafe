import { View, FlatList, Text } from "react-native";
import { useState } from "react";
import { EmergencyPostCard, SearchInput } from "../../../ui";
import { COLORS, SIZES, globalStyles } from "../../../constants";
import { useFetch, useDeletePost } from "../../../hooks";
import Loading from "../../Loading";
import ErrorScreen from "../../ErrorScreen";
import { apiClient } from "../../../config";

const Emergencies = () => {
  const [searchString, setSearchString] = useState("");
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

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

  const handleSearch = async (text) => {
    setSearchString(text);
    if (text.length > 2) {
      const res = await apiClient.get("emergency?search=" + text);
      setSearchResult(res.data.data.results);
    }
    // Reset search result
    if (!text) setSearchResult([]);
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
              handleChange={handleSearch}
              handleFocus={() => setInputIsFocused(true)}
              handleBlur={() => setInputIsFocused(false)}
            />
          </View>

          {!searchResult.length && searchString && (
            <Text
              style={[
                globalStyles.h3,
                { textAlign: "center", marginVertical: 12 },
              ]}
            >
              No search result
            </Text>
          )}

          <FlatList
            data={searchString.length ? searchResult : allEmergencies}
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
