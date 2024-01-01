import "react-native-gesture-handler";
import { AuthProvider, useAuth } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import { HomeStack, AuthStack } from "./navigation";
import * as SplashScreen from "expo-splash-screen";
import { Loading } from "./screens";

export default function App() {
  const [fontsLoaded] = useFonts({
    light: require("./assets/fonts/Poppins-Light.ttf"),
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <AuthProvider>
      <AppNavigation />
      <StatusBar style="dark" />
    </AuthProvider>
  );
}

const AppNavigation = () => {
  const { token, loadingAuth } = useAuth();

  if (loadingAuth) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {token ? <HomeStack /> : <AuthStack />}
      {/* <HomeStack /> */}
    </NavigationContainer>
  );
};
