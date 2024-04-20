import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Appointment } from "../Screens/Appointment";
import { Profile } from "../Screens/Profile";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { HomeNavigation } from "./HomeNavigation";
import { Explores } from "../Screens/Explores";
import { useAuth } from "@clerk/clerk-expo";

export function TabNavigation() {
  const Tab = createBottomTabNavigator();
  const { isSignedIn } = useAuth();
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
        redirect={!isSignedIn}
      />
      <Tab.Screen
        name="Explores"
        component={Explores}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
          tabBarLabelStyle: {
            fontFamily: "appfont",
            fontSize: 14,
          },
        }}
        redirect={!isSignedIn}
      />
      <Tab.Screen
        name="Appointment"
        component={Appointment}
        options={{
          tabBarLabel: "Appointments",
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
        redirect={!isSignedIn}
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
