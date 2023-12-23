import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabStack from "./BottomTabStack";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../constants";
import { Welcome, ReportSuccess, Notifications, Search } from "../screens";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={{ headerTitle: "" }}>
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabStack}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Welcome"
        component={Welcome}
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
