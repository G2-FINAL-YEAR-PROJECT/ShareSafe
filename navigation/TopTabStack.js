import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Emergencies, Home } from "../screens";
import { COLORS } from "../constants";
import { Text } from "react-native";

const TopTab = createMaterialTopTabNavigator();
const TopTabStack = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "capitalize",
        },
        tabBarStyle: {
          //   elevation: 0,
          backgroundColor: "white",
        },
      }}
    >
      <TopTab.Screen
        name="Posts"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.gray3,
                  fontFamily: "medium",
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
            marginLeft: 73,
          },
        }}
      />
      <TopTab.Screen
        name="Emergencies"
        component={Emergencies}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.gray3,
                  fontFamily: "medium",
                }}
              >
                Emergencies
              </Text>
            );
          },
          tabBarIndicatorStyle: {
            height: 3,
            backgroundColor: COLORS.primary,
            maxWidth: "39%",
            marginLeft: 51,
          },
        }}
      />
    </TopTab.Navigator>
  );
};

export default TopTabStack;
