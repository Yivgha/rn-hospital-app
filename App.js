import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigation } from "./App/Navigations/TabNavigation";
import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";
import { SignInNavigation } from "./App/Navigations/SignInNavigation";

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

  const tokenCache = {
    async getToken(key) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (error) {
        return null;
      }
    },
    async saveToken(key, value) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (error) {
        return;
      }
    },
  };

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        <NavigationContainer>
          <SignedIn>
            <TabNavigation />
          </SignedIn>
          <SignedOut>
            <SignInNavigation />
          </SignedOut>
        </NavigationContainer>
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
