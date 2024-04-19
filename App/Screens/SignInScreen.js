import { View, Text, Pressable } from "react-native";
import { SignInWithEmail } from "../Components/AuthScreens/SignInWithEmail";
import { useNavigation } from "@react-navigation/native";
import { GoToLoginBtn } from "../Components/AuthScreens/GoToLoginBtn";
import SignInStyles from "../../assets/Shared/SignInStyles";

export function SignInScreen() {
  const navigation = useNavigation();
  return (
    <View style={SignInStyles.pageBox}>
      <GoToLoginBtn
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
      <SignInWithEmail />
      <View style={SignInStyles.textContainer}>
        <Text style={SignInStyles.textColor}>Don't have an account yet?</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("SignUpScreen");
          }}
        >
          <Text style={SignInStyles.actionText}>Sign up!</Text>
        </Pressable>
      </View>
    </View>
  );
}
