import { View, Text, Pressable } from "react-native";
import { SignInWithEmail } from "../Components/SignInWithEmail";

export function SignInScreen() {
  return (
    <View>
      <SignInWithEmail />
      <Text>Don't have account yet?</Text>
      <Pressable onPress={() => console.log("clicked sign up")}>
        Sign up!
      </Pressable>
    </View>
  );
}
