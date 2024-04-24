import { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import SignInStyles from "../../../assets/Shared/SignInStyles";
import { CustomInput } from "./CustomInput";

export function SignInWithEmail() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={SignInStyles.signInForm}>
      <CustomInput
        value={emailAddress}
        setValue={setEmailAddress}
        placeholder={"Email..."}
      />

      <CustomInput
        value={password}
        setValue={setPassword}
        secureTextEntry={secureTextEntry}
        toggleSecureEntry={toggleSecureEntry}
        placeholder={"Password..."}
      />

      <TouchableOpacity onPress={onSignInPress} style={SignInStyles.buttonBox}>
        <Text style={SignInStyles.buttonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}
