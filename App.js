import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";
import HomeStack from "./navigation/HomeStack";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AuthStack />
        {/* <HomeStack /> */}
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}
