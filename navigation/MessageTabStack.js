import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS } from "../constants";
import { Text } from "react-native";
import { InboxTab, UnreadTab, ArchiveTab } from "../screens";
// import { useEffect, useState } from "react";
// import { apiClient } from "../config";
// import { useHomeContext } from "../store/HomeContext";
// import { useAuth } from "../store";

const MessageTab = createMaterialTopTabNavigator();

const MessageTabStack = () => {
  // const { userData } = useAuth();
  // const { setMessagesList, setMsgLoading } = useHomeContext();

  // const sortMessagesList = (messagesList) => {
  //   const getUsersData = (message) => {
  //     let newMessage = { ...message, sender: null, receiver: null };
  //     // If the current user is the sender, return the receiver
  //     if (userData.id == message.sender.id) {
  //       newMessage.currentUser = message.sender;
  //       newMessage.targetUser = message.receiver;
  //       newMessage.sentByCurrentUser = true;
  //     }
  //     // If the current user is the receiver, return the sender
  //     else if (userData.id == message.receiver.id) {
  //       newMessage.currentUser = message.receiver;
  //       newMessage.targetUser = message.sender;
  //       newMessage.sentByCurrentUser = false;
  //     } else {
  //       // Handle the case where the current user is not the sender or receiver
  //       newMessage = null;
  //     }

  //     return newMessage;
  //   };
  //   return messagesList.map((message) => getUsersData(message));
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await apiClient.get("message/user");
  //     const data = res?.data?.data;
  //     setMsgLoading(false);
  //     setMessagesList(sortMessagesList(data));
  //     // console.log("message/user:", sortMessagesList(data));
  //   };

  //   fetchData();
  // }, []);

  return (
    <MessageTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "capitalize",
        },
        tabBarStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <MessageTab.Screen
        name="Messages"
        component={InboxTab}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: focused ? COLORS.black2 : COLORS.gray3,
                  fontFamily: "semibold",
                }}
              >
                Inbox
              </Text>
            );
          },
          tabBarIndicatorStyle: {
            height: 3,
            backgroundColor: COLORS.black2,
            maxWidth: "40%",
            marginLeft: 46,
          },
        }}
      />

      <MessageTab.Screen
        name="Unread"
        component={UnreadTab}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: focused ? COLORS.black2 : COLORS.gray3,
                  fontFamily: "semibold",
                }}
              >
                Unread
              </Text>
            );
          },
          tabBarIndicatorStyle: {
            height: 3,
            backgroundColor: COLORS.black2,
            maxWidth: "40%",
            marginLeft: 46,
          },
        }}
      />
    </MessageTab.Navigator>
  );
};

export default MessageTabStack;
