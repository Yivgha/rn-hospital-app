import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Appointment } from "../Screens/Appointment";
import { Profile } from "../Screens/Profile";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { HomeNavigation } from "./HomeNavigation";

export function TabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
          tabBarLabelStyle: {
            fontFamily: "appfont",
            fontSize: 14,
          },
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={Appointment}
        options={{
          tabBarLabel: "Appointment",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="calendar-number-outline"
              size={size}
              color={color}
            />
          ),
          tabBarLabelStyle: {
            fontFamily: "appfont",
            fontSize: 14,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          tabBarLabelStyle: {
            fontFamily: "appfont",
            fontSize: 14,
          },
        }}
      />
    </Tab.Navigator>
  );
}
