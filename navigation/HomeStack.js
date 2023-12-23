import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabStack from "./BottomTabStack";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../constants";
import { Welcome, ReportSuccess, Notifications, Search, Loading } from "../screens";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [hideWelcomeScreen, setHideWelcomeScreen] = useState(false);

  const checkWelcomeStatus = async () => {
    try {
      const value = await AsyncStorage.getItem("@hideWelcomeScreen");
      if (value) setHideWelcomeScreen(true);
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
    <Stack.Navigator screenOptions={{ headerTitle: "" }}>
      {loading && <Stack.Screen name="Loading" component={Loading} />}

      {!hideWelcomeScreen && (
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
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
        name="Notifications"
        component={Notifications}
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
              onPressIn={() => navigation.navigate("ProfileTabStack")}
            >
              <Ionicons name="person" size={24} color={COLORS.primary} />
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
              <Ionicons
                name="arrow-back"
                onPress={() => navigation.goBack()}
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          ),

          headerRight: () => (
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPressIn={() => navigation.navigate("Notifications")}
            >
              <Ionicons name="notifications" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
