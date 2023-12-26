import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";
import { useState } from "react";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchIsFocused, setSearchIsFocused] = useState(false);
  return (
    <ScrollView
      style={[
        SIZES.safeAreaView,
        { backgroundColor: COLORS.white, paddingTop: 20 },
      ]}
    >
      <View style={styles.searchContainer(searchIsFocused)}>
        <Ionicons name="search" size={24} color="#252525" />
        <TextInput
          style={styles.searchInput}
          placeholderTextColor="#252525"
          cursorColor={COLORS.black}
          placeholder="Search"
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
          onFocus={() => setSearchIsFocused(true)}
          onBlur={() => setSearchIsFocused(false)}
        />
      </View>
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: (searchIsFocused) => {
    return {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: searchIsFocused ? 2 : 1,
      borderColor: searchIsFocused ? COLORS.black : "rgba(154, 154, 154, 0.50)",
      borderRadius: 5,
      paddingLeft: 18,
      paddingRight: 13,
      backgroundColor: COLORS.offWhite,
    };
  },

  searchInput: {
    flex: 1,
    backgroundColor: "transparent",
    paddingLeft: 10,
    paddingVertical: 12,
    fontSize: 12,
    fontFamily: "medium",
  },
});
