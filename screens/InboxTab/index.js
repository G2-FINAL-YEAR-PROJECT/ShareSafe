import { StyleSheet, View, Text, FlatList, LogBox } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { ChatList, SearchMessageInput } from "../../ui";
// import { messages } from "../../data";
import { useEffect, useState } from "react";
import { useHideKeyBoard } from "../../hooks";
import Loading from "../Loading";
import { useHomeContext } from "../../store/HomeContext";
import { useAuth } from "../../store";
import { apiClient } from "../../config";

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

const InboxTab = () => {
  const { userData } = useAuth();
  const { messagesList, msgLoading, setMessagesList, setMsgLoading } =
    useHomeContext();
  const [sortedMessagesList, setSortedMessagesList] = useState(
    getUniqueMessages(messagesList)
  );
  const [searchValue, setSearchValue] = useState("");
  const [searchIsFocused, setSearchIsFocused] = useState(false);
  useHideKeyBoard(setSearchIsFocused);

  const sortMessagesList = (messagesList) => {
    const getUsersData = (message) => {
      let newMessage = { ...message, sender: null, receiver: null };
      // If the current user is the sender, return the receiver
      if (userData.id == message.sender.id) {
        newMessage.currentUser = message.sender;
        newMessage.targetUser = message.receiver;
        newMessage.sentByCurrentUser = true;
      }
      // If the current user is the receiver, return the sender
      else if (userData.id == message.receiver.id) {
        newMessage.currentUser = message.receiver;
        newMessage.targetUser = message.sender;
        newMessage.sentByCurrentUser = false;
      } else {
        // Handle the case where the current user is not the sender or receiver
        newMessage = null;
      }

      return newMessage;
    };
    return messagesList.map((message) => getUsersData(message));
  };

  const fetchData = async () => {
    try {
      const res = await apiClient.get("message/user");
      const data = sortMessagesList(res?.data?.data);
      setMsgLoading(false);
      setMessagesList(data);
      setSortedMessagesList(getUniqueMessages(data));
    } catch (error) {
      console.log(error);
    } finally {
      setMsgLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (messagesList.length) {
      setSortedMessagesList(getUniqueMessages(messagesList));
    }
  }, [messagesList]);

  const handleSearch = (text) => {
    setSearchValue(text);
    // console.log(text);
    if (text) {
      setSortedMessagesList(
        getUniqueMessages(messagesList).filter((item) =>
          item.targetUser.fullName.includes(text)
        )
      );
    } else {
      setSortedMessagesList(getUniqueMessages(messagesList));
    }
  };

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
        handleChange={handleSearch}
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
