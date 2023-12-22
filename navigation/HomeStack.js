import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabStack from "./BottomTabStack";

import { Loading, Welcome } from "../screens";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {loading && <Stack.Screen name="Loading" component={Loading} />}

      {!hideWelcomeScreen && <Stack.Screen name="Welcome" component={Welcome} />}
      <Stack.Screen name="BottomTabStack" component={BottomTabStack} />
    </Stack.Navigator>
  );
};

export default HomeStack;
