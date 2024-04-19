import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { SignInScreen } from "../Screens/SignInScreen";
import { SignUpScreen } from "../Screens/SignUpScreen";
import { Login } from "../Screens/Login";

const Stack = createStackNavigator();

export function SignInNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
