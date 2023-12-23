import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS } from "../constants";
import { Text } from "react-native";
import { Profile, ReportsTab, LikesTab } from "../screens";

const ProfileTab = createMaterialTopTabNavigator();

const ProfileTabStack = () => {
  return (
    <ProfileTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "capitalize",
        },
        tabBarStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <ProfileTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.gray3,
                  fontFamily: "semibold",
                }}
              >
                Posts
              </Text>
            );
          },
          tabBarIndicatorStyle: {
            height: 3,
            backgroundColor: COLORS.primary,
            maxWidth: "19%",
            marginLeft: 48,
          },
        }}
      />
      <ProfileTab.Screen
        name="Reports"
        component={ReportsTab}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.gray3,
                  fontFamily: "semibold",
                }}
              >
                Reports
              </Text>
            );
          },
          tabBarIndicatorStyle: {
            height: 3,
            backgroundColor: COLORS.primary,
            maxWidth: "34%",
            marginLeft: 37,
          },
        }}
      />
      <ProfileTab.Screen
        name="Likes"
        component={LikesTab}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.gray3,
                  fontFamily: "semibold",
                }}
              >
                Likes
              </Text>
            );
          },
          tabBarIndicatorStyle: {
            height: 3,
            backgroundColor: COLORS.primary,
            maxWidth: "19%",
            marginLeft: 50,
          },
        }}
      />
    </ProfileTab.Navigator>
  );
};

export default ProfileTabStack;
