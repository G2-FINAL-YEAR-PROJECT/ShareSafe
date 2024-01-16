import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS } from "../constants";
import { Text } from "react-native";
import { InboxTab, UnreadTab, ArchiveTab } from "../screens";

const MessageTab = createMaterialTopTabNavigator();

const MessageTabStack = () => {
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
            maxWidth: "19%",
            marginLeft: 48,
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
            maxWidth: "34%",
            marginLeft: 37,
          },
        }}
      />
      <MessageTab.Screen
        name="Archive"
        component={ArchiveTab}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: focused ? COLORS.black2 : COLORS.gray3,
                  fontFamily: "semibold",
                }}
              >
                Archive
              </Text>
            );
          },
          tabBarIndicatorStyle: {
            height: 3,
            backgroundColor: COLORS.black2,
            maxWidth: "29%",
            marginLeft: 40,
          },
        }}
      />
    </MessageTab.Navigator>
  );
};

export default MessageTabStack;
