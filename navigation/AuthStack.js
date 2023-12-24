import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Register, ForgotPassword, ResetPassword, Onboarding, VerifyOTP } from "../screens";
import { useAuth } from "../store";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  const { viewedOnboarding } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!viewedOnboarding && <Stack.Screen name="Onboarding" component={Onboarding} />}

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
