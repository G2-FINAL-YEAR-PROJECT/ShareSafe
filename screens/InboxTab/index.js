import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import { ChatList, SearchMessageInput } from "../../ui";
import { messages } from "../../data";
import { useState } from "react";
import { useHideKeyBoard } from "../../hooks";

const InboxTab = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchIsFocused, setSearchIsFocused] = useState(false);

  useHideKeyBoard(setSearchIsFocused);
  return (
    <View
      style={[
        SIZES.safeAreaView,
        { backgroundColor: COLORS.white, paddingTop: 20, paddingBottom: 150 },
      ]}
    >
      {/* SEARCH INPUT STARTS */}
      <SearchMessageInput
        value={searchValue}
        inputIsFocused={searchIsFocused}
        placeholder="Search inbox messages..."
        handleChange={(text) => setSearchValue(text)}
        handleFocus={() => setSearchIsFocused(true)}
        handleBlur={() => setSearchIsFocused(false)}
      />

      {/* SEARCH INPUT ENDS */}

      <View style={{ alignSelf: "flex-end", marginTop: 17 }}>
        <TouchableOpacity>
          <Text style={styles.markAll}>mark all as read</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 12 }}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <ChatList item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default InboxTab;

const styles = StyleSheet.create({
  markAll: {
    fontSize: 11.5,
    color: COLORS.black2,
    fontFamily: "semibold",
  },
});
