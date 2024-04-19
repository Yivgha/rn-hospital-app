import { View } from "react-native";
import { SignUp } from "../Components/SignUp";

export function SignUpScreen() {
  return (
    <View>
      <SignUp />
      <Text>Already have account?</Text>
      <Pressable onPress={() => console.log("clicked sign in")}>
        Sign in!
      </Pressable>
    </View>
  );
}
