import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { Report, CreatePost, NotificationsScreen } from "../screens";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import TopTabStack from "./TopTabStack";
import MessageTabStack from "./MessageTabStack";
import { COLORS } from "../constants";
import { Header } from "../ui";
import { useAuth } from "../store";
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

  const { notificationCount, setNotificationCount } = useAuth();

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
            unmountOnBlur: true,
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
          component={NotificationsScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return (
                <View>
                  <Ionicons
                    name="notifications"
                    size={notificationCount > 0 ? 30 : 24}
                    color={COLORS.white}
                  />
                  {notificationCount > 0 && (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: COLORS.red,
                        width: 18,
                        height: 18,

                        borderRadius: 10,
                        position: "absolute",
                        right: 0,
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.white,
                          fontFamily: "semibold",
                          textAlign: "center",
                          fontSize: 14,
                        }}
                      >
                        {notificationCount}
                      </Text>
                    </View>
                  )}
                </View>
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
