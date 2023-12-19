import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Onboarding,
  Loading,
} from "../screens";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");

      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (err) {
      console.log("Error @checkOnboarding: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {loading && <Stack.Screen name="Loading" component={Loading} />}

      {!viewedOnboarding && (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      )}

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
