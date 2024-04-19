import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import SplashLogo from "../../assets/images/splash.png";
import Colors from "../../assets/Shared/Colors";
import SignInWithOAuth from "../Components/SignInWithOAuth";
import { useNavigation } from "@react-navigation/native";

export function Login() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screenBox}>
      <Image source={SplashLogo} style={styles.splashImg} />
      <View style={{ gap: 10 }}>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.additionalText}>Find your doctor in this app</Text>
      </View>
      <View style={styles.loginBox}>
        <SignInWithOAuth />
        <Text style={styles.headingText}>or</Text>
        <TouchableOpacity
          style={styles.buttonBox}
          onPress={() => {
            // navigation.navigate("SignInScreen");
            console.log("pressed sign in");
          }}
        >
          <Text style={styles.buttonText}>Sign in with Email</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenBox: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: "flex-start",
    gap: 25,
    backgroundColor: Colors.celestial,
  },
  splashImg: {
    width: "100%",
    height: Dimensions.get("screen").height * 0.45,
    objectFit: "contain",
  },
  headingText: {
    fontSize: 24,
    color: Colors.white,
    fontFamily: "appfontBold",
    textTransform: "uppercase",
  },
  additionalText: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: "appfontSemibold",
  },
  loginBox: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttonBox: {
    padding: 16,
    borderRadius: 90,
    alignItems: "center",
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
