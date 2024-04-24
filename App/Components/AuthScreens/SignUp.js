import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import SignInStyles from "../../../assets/Shared/SignInStyles";
import { CustomInput } from "./CustomInput";

export function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      {!pendingVerification && (
        <View style={SignInStyles.signInForm}>
          <View style={{ gap: 10 }}>
            <CustomInput
              value={firstName}
              setValue={setFirstName}
              toggleSecureEntry={toggleSecureEntry}
              placeholder={"First name..."}
            />
            <CustomInput
              value={lastName}
              setValue={setLastName}
              toggleSecureEntry={toggleSecureEntry}
              placeholder={"Last name..."}
            />
            <CustomInput
              value={emailAddress}
              setValue={setEmailAddress}
              toggleSecureEntry={toggleSecureEntry}
              placeholder={"Email..."}
            />

            <CustomInput
              value={password}
              setValue={setPassword}
              secureTextEntry={secureTextEntry}
              toggleSecureEntry={toggleSecureEntry}
              placeholder={"Password..."}
            />

            <TouchableOpacity
              onPress={() => {
                onSignUpPress();
              }}
              style={SignInStyles.buttonBox}
            >
              <Text style={SignInStyles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {pendingVerification && (
        <View style={SignInStyles.signInForm}>
          <CustomInput
            value={code}
            setValue={setCode}
            secureTextEntry={secureTextEntry}
            toggleSecureEntry={toggleSecureEntry}
            placeholder={"Code..."}
          />

          <TouchableOpacity
            onPress={onPressVerify}
            style={SignInStyles.buttonBox}
          >
            <Text style={SignInStyles.buttonText}>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
