import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, Image } from "react-native";
import { Report, CreatePost, Messages, Profile } from "../screens";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import TopTabStack from "./TopTabStack";
import { COLORS } from "../constants";
import { Header } from "../ui";

const Tab = createBottomTabNavigator();
const BottomTabStack = () => {
  const screenOptions = {
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      height: 70,
      backgroundColor: COLORS.primary,
    },
  };
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={TopTabStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={COLORS.white}
              />
            );
          },

          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: focused ? "semibold" : "regular",
                }}
              >
                Home
              </Text>
            );
          },

          headerTitle: () => (
            <Header showRecommended showSearchNotify showLogo />
          ),
          headerStyle: {
            elevation: 0,
            height: 235,
          },
        }}
      />

      <Tab.Screen
        name="Report"
        component={Report}
        options={{
          tabBarIcon: () => {
            return (
              <AntDesign name="notification" size={24} color={COLORS.white} />
            );
          },

          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: focused ? "semibold" : "regular",
                }}
              >
                Report
              </Text>
            );
          },

          headerTitle: () => <Header showBack showSearchNotify />,
          headerStyle: {
            elevation: 0,
          },
        }}
      />

      <Tab.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          tabBarIcon: () => {
            return (
              <MaterialIcons name="add-box" size={35} color={COLORS.white} />
            );
          },

          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: focused ? "semibold" : "regular",
                }}
              >
                Post
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "chatbubbles" : "chatbubbles-outline"}
                size={24}
                color={COLORS.white}
              />
            );
          },

          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: focused ? "semibold" : "regular",
                }}
              >
                Messages
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={COLORS.white}
              />
            );
          },
          tabBarShowLabel: true,
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: focused ? "semibold" : "regular",
                }}
              >
                Profile
              </Text>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabStack;
