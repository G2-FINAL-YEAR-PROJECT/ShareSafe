import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { useState } from "react";

const InboxTab = () => {
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
        <TextInput
          style={styles.searchInput}
          placeholderTextColor="#252525"
          cursorColor={COLORS.black}
          placeholder="Search message"
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
          onFocus={() => setSearchIsFocused(true)}
          onBlur={() => setSearchIsFocused(false)}
        />
      </View>
    </ScrollView>
  );
};

export default InboxTab;

const styles = StyleSheet.create({
  searchContainer: (searchIsFocused) => {
    return {
      borderWidth: searchIsFocused ? 2 : 1,
      borderColor: searchIsFocused ? COLORS.black : COLORS.gray2,
      borderRadius: 5,
    };
  },

  searchInput: {
    flex: 1,
    backgroundColor: "transparent",
    paddingVertical: 12,
    fontSize: 12,
    fontFamily: "medium",
    paddingLeft: 25,
    paddingRight: 13,
  },
});
