import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Login, Register, ForgotPassword, ResetPassword, Onboarding, Loading } from "../screens";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  const { viewedOnboarding } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!viewedOnboarding && <Stack.Screen name="Onboarding" component={Onboarding} />}

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
