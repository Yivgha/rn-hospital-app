import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigation } from "./App/Navigations/TabNavigation";
import Login from "./App/Screens/Login";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    appfont: require("./assets/fonts/Outfit-Regular.ttf"),
    appfontBold: require("./assets/fonts/Outfit-Bold.ttf"),
    appfontSemibold: require("./assets/fonts/Outfit-SemiBold.ttf"),
    appfontLight: require("./assets/fonts/Outfit-Light.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <Login />
        </SignedOut>
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
