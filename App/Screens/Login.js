import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import SplashLogo from "../../assets/images/splash.png";
import Colors from "../../assets/Shared/Colors";
import SignInWithOAuth from "../Components/SignInWithOAuth";
// import SignInWithEmail from "../Components/SignInWithEmail";
// import SignUpScreen from "../Components/SignUpScreen";

export default function Login() {
  return (
    <View style={styles.screenBox}>
      <Image source={SplashLogo} style={styles.splashImg} />
      <View>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.additionalText}>Find your doctor in this app</Text>
      </View>
      <View style={styles.loginBox}>
        <SignInWithOAuth />
        {/* <Text style={styles.headingText}>or</Text> */}
        {/* <TouchableOpacity
          style={styles.buttonBox}
          title="Sign in with Email"
          // onPress={() => navigation.navigate("SignInWithEmail")}
        >
          <Text style={styles.buttonText}>Sign in with Email</Text>
        </TouchableOpacity> */}
        {/* <SignUpScreen /> */}
      </View>
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
    color: Colors.white,
    fontFamily: "appfontBold",
  },
  additionalText: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: "appfontSemibold",
  },
  loginBox: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
});
