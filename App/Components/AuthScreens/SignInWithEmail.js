import { useState } from "react";
import { TouchableOpacity, Text, View, TextInput } from "react-native";
import Colors from "../../../assets/Shared/Colors";
import { useSignIn } from "@clerk/clerk-expo";
import SignInStyles from "../../../assets/Shared/SignInStyles";

export function SignInWithEmail() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={SignInStyles.signInForm}>
      <View>
        <TextInput
          style={SignInStyles.inputForm}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          placeholderTextColor={Colors.gray}
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>

      <View>
        <TextInput
          style={SignInStyles.inputForm}
          value={password}
          placeholder="Password..."
          placeholderTextColor={Colors.gray}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity onPress={onSignInPress} style={SignInStyles.buttonBox}>
        <Text style={SignInStyles.buttonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}
