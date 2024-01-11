import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import { ChatList, SearchMessageInput } from "../../ui";
// import { messages } from "../../data";
import { useState } from "react";
import { useHideKeyBoard } from "../../hooks";
import Loading from "../Loading";
import { useHomeContext } from "../../store/HomeContext";

const InboxTab = () => {
  const { messagesList, msgLoading } = useHomeContext();
  const [searchValue, setSearchValue] = useState("");
  const [searchIsFocused, setSearchIsFocused] = useState(false);
  useHideKeyBoard(setSearchIsFocused);

  // Create a Map to store unique messages based on receiver ID
  const getUniqueMessages = (messagesList) => {
    const uniqueMessagesMap = new Map();
    messagesList.forEach((message) => {
      const targetUserId = message.targetUser.id;
      // If receiver ID is not present in the Map, add the message
      if (!uniqueMessagesMap.has(targetUserId)) {
        uniqueMessagesMap.set(targetUserId, message);
      }
    });
    // Convert the Map values back to an array
    return Array.from(uniqueMessagesMap.values());
  };

  let sortedMessagesList = getUniqueMessages(messagesList);

  // console.log("sortedMessagesList:", sortedMessagesList);

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

      {/* <View style={{ alignSelf: "flex-end", marginTop: 17 }}>
        <TouchableOpacity>
          <Text style={styles.markAll}>mark all as read</Text>
        </TouchableOpacity>
      </View> */}

      {msgLoading ? (
        <Loading />
      ) : (
        <View style={{ marginTop: 26 }}>
          <FlatList
            data={sortedMessagesList}
            renderItem={({ item }) => <ChatList item={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
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
