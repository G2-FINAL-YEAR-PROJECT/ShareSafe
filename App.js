import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";
import HomeStack from "./navigation/HomeStack";
import { AuthProvider, useAuth } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigation />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}

const AppNavigation = () => {
  const { token } = useAuth();
  return <NavigationContainer>{token ? <HomeStack /> : <AuthStack />}</NavigationContainer>;
};
