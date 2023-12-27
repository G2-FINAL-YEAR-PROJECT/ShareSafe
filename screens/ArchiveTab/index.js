import { View, FlatList } from "react-native";

import { COLORS, SIZES } from "../../constants";
import { ChatList, SearchMessageInput } from "../../ui";
import { messages } from "../../data";
import { useState } from "react";
import { useHideKeyBoard } from "../../hooks";

const ArchiveTab = () => {
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
        placeholder="Search archive messages..."
        handleChange={(text) => setSearchValue(text)}
        handleFocus={() => setSearchIsFocused(true)}
        handleBlur={() => setSearchIsFocused(false)}
      />

      {/* SEARCH INPUT ENDS */}

      <View style={{ marginTop: 18 }}>
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

export default ArchiveTab;
