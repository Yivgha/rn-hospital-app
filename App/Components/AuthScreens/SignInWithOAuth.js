import React from "react";
import * as WebBrowser from "expo-web-browser";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../../hooks/useWarmUpBrowser";
import Colors from "../../../assets/Shared/Colors";

WebBrowser.maybeCompleteAuthSession();

export const SignInWithOAuth = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      Alert.alert(
        "OAuth Error",
        <Text>
          An error occurred during the OAuth process: {err.message || err}
        </Text>
      );
      console.error("OAuth error", err.message);
    }
  }, []);

  return (
    <TouchableOpacity
      style={styles.buttonBox}
      title="Sign in with Google"
      onPress={onPress}
    >
      <Text style={styles.buttonText}>Sign in with Google</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBox: {
    padding: 16,
    borderRadius: 90,
    alignItems: "center",
    marginTop: 20,
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: Colors.black,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: "appfontLight",
  },
});
