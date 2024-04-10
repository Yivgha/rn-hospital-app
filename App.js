import { StyleSheet, View, SafeAreaView, Text } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import Login from "./App/Screens/Login";
import Home from "./App/Screens/Home";

export default function App() {
  return (
    <ClerkProvider
      publishableKey={"pk_test_ZWFnZXItcmFjZXItNTQuY2xlcmsuYWNjb3VudHMuZGV2JA"}
    >
      <SafeAreaView style={styles.container}>
        {/* <Home /> */}
        <SignedIn>
          <Home />
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
    backgroundColor: "#fff",
  },
});
