import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../Screens/Home";
import { HospitalDoctorsListScreen } from "../Screens/HospitalDoctorsListScreen";
import { HospitalDetails } from "../Screens/HospitalDetails";

const Stack = createStackNavigator();

export function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="HospitalDoctorsListScreen"
        component={HospitalDoctorsListScreen}
      />
      <Stack.Screen name="HospitalDetails" component={HospitalDetails} />
    </Stack.Navigator>
  );
}
