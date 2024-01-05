import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { Report, CreatePost, Notifications } from "../screens";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import TopTabStack from "./TopTabStack";
import MessageTabStack from "./MessageTabStack";
import { COLORS } from "../constants";
import { Header } from "../ui";
import { LocationProvider } from "../store";

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
    <LocationProvider>
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
              <Header showRecommended showSearchProfile showLogo />
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
                <Ionicons
                  name="ios-megaphone-outline"
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
                  Report
                </Text>
              );
            },

            headerTitle: () => <Header showBack showSearchProfile />,
            headerStyle: {
              elevation: 0,
            },
          }}
        />

        <Tab.Screen
          name="CreatePost"
          component={CreatePost}
          options={{
            tabBarStyle: {
              display: "none",
            },
            headerShown: false,

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
          name="MessageTabStack"
          component={MessageTabStack}
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
            headerTitle: () => <Header showBack showSearchProfile />,
            headerStyle: {
              elevation: 0,
            },
          }}
        />

        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return (
                <Ionicons name="notifications" size={24} color={COLORS.white} />
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
                  Alerts
                </Text>
              );
            },
          }}
        />
      </Tab.Navigator>
    </LocationProvider>
  );
};

export default BottomTabStack;
