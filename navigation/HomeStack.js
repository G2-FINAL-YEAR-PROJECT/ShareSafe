import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabStack from "./BottomTabStack";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../constants";
import {
  Welcome,
  ReportSuccess,
  Search,
  Loading,
  PostDetails,
  EmergencyDetails,
  EditProfile,
  ChatDetails,
  CameraScreen,
} from "../screens";

import { ProfileHeader } from "../components";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileTabStack from "./ProfileTabStack";
import { HomeContextProvider } from "../store/HomeContext";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);

  const checkWelcomeStatus = async () => {
    try {
      const value = await AsyncStorage.getItem("@showWelcomeScreen");
      if (value !== null) {
        setShowWelcomeScreen(true);
      }
    } catch (error) {
      console.log("Error @checkWelcomeStatus: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkWelcomeStatus();
  }, []);

  return (
    <HomeContextProvider>
      <Stack.Navigator screenOptions={{ headerTitle: "" }}>
        {loading && (
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{ headerShown: false }}
          />
        )}

        {showWelcomeScreen && (
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
        )}

        <Stack.Screen
          name="BottomTabStack"
          component={BottomTabStack}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ReportSuccess"
          component={ReportSuccess}
          options={{
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPressIn={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPressIn={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            ),

            headerRight: () => (
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPressIn={() => navigation.navigate("Notifications")}
              >
                <Ionicons
                  name="notifications"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="PostDetails"
          component={PostDetails}
          options={{
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPressIn={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            ),

            headerRight: () => (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
              >
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPressIn={() => navigation.navigate("Search")}
                >
                  <Ionicons name="search" size={24} color={COLORS.primary} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPressIn={() => navigation.navigate("Notifications")}
                >
                  <Ionicons
                    name="notifications"
                    size={24}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />

        <Stack.Screen
          name="EmergencyDetails"
          component={EmergencyDetails}
          options={{
            headerShadowVisible: false,

            headerLeft: () => (
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPressIn={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            ),

            headerRight: () => (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
              >
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPressIn={() => navigation.navigate("Search")}
                >
                  <Ionicons name="search" size={24} color={COLORS.primary} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPressIn={() => navigation.navigate("Notifications")}
                >
                  <Ionicons
                    name="notifications"
                    size={24}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPressIn={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="ChatDetails"
          component={ChatDetails}
          options={{
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPressIn={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="ProfileTabStack"
          component={ProfileTabStack}
          options={{
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLargeTitle: true,

            headerTitle: () => <ProfileHeader />,
          }}
        />
      </Stack.Navigator>
    </HomeContextProvider>
  );
};

export default HomeStack;
