import { View, Image, StyleSheet, Text } from "react-native";
import SplashLogo from "../../assets/images/splash.png";
import Colors from "../../assets/Shared/Colors";
import SignInWithOAuth from "../Components/SignInWithOAuth";

export default function Login() {
  return (
    <View style={styles.screenBox}>
      <Image source={SplashLogo} style={styles.splashImg} />
      <View>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.additionalText}>Find your doctor in this app</Text>
      </View>

      <SignInWithOAuth />
    </View>
  );
}

const styles = StyleSheet.create({
  screenBox: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: Colors.celestial,
  },
  splashImg: {
    width: "100%",
    height: 500,
    objectFit: "contain",
  },
  headingText: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.white,
  },
  additionalText: {
    fontSize: 16,
    color: Colors.white,
  },
});
