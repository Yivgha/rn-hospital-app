import { View, Text, Pressable } from "react-native";
import { SignUp } from "../Components/SignUp";
import { useNavigation } from "@react-navigation/native";
import { GoToLoginBtn } from "../Components/AuthScreens/GoToLoginBtn";
import SignInStyles from "../../assets/Shared/SignInStyles";

export function SignUpScreen() {
  const navigation = useNavigation();
  return (
    <View style={SignInStyles.pageBox}>
      <GoToLoginBtn
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
      <SignUp />
      <View style={SignInStyles.textContainer}>
        <Text style={SignInStyles.textColor}>Already have account?</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("SignInScreen");
          }}
        >
          <Text style={SignInStyles.actionText}>Sign in!</Text>
        </Pressable>
      </View>
    </View>
  );
}
