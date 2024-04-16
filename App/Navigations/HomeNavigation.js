import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../Screens/Home";
import { HospitalDoctorsListScreen } from "../Screens/HospitalDoctorsListScreen";
import { HospitalDetails } from "../Screens/HospitalDetails";
import { BookAppointment } from "../Screens/BookAppointment";
import { DoctorDetails } from "../Screens/DoctorDetails";
import { PremiumHospitals } from "../Screens/PremiumHospitals";
import { SpecialitiesList } from "../Screens/SpecialitiesList";

const Stack = createStackNavigator();

export function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeInner" component={Home} />
      <Stack.Screen
        name="HospitalDoctorsListScreen"
        component={HospitalDoctorsListScreen}
      />
      <Stack.Screen name="SpecialitiesList" component={SpecialitiesList} />
      <Stack.Screen name="HospitalDetails" component={HospitalDetails} />
      <Stack.Screen name="PremiumHospitals" component={PremiumHospitals} />
      <Stack.Screen name="DoctorDetails" component={DoctorDetails} />
      <Stack.Screen name="BookAppointment" component={BookAppointment} />
    </Stack.Navigator>
  );
}
