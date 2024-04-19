import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import Colors from "../../assets/Shared/Colors";
import SignInStyles from "../../assets/Shared/SignInStyles";

export function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  // start the sign up process.
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
    <View style={SignInStyles.signInForm}>
      {!pendingVerification && (
        <View style={{ gap: 10 }}>
          <View>
            <TextInput
              style={SignInStyles.inputForm}
              placeholderTextColor={Colors.gray}
              autoCapitalize="none"
              value={firstName}
              placeholder="First Name..."
              onChangeText={(firstName) => setFirstName(firstName)}
            />
          </View>
          <View>
            <TextInput
              style={SignInStyles.inputForm}
              placeholderTextColor={Colors.gray}
              autoCapitalize="none"
              value={lastName}
              placeholder="Last Name..."
              onChangeText={(lastName) => setLastName(lastName)}
            />
          </View>
          <View>
            <TextInput
              style={SignInStyles.inputForm}
              placeholderTextColor={Colors.gray}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
            />
          </View>

          <View>
            <TextInput
              style={SignInStyles.inputForm}
              placeholderTextColor={Colors.gray}
              value={password}
              placeholder="Password..."
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <TouchableOpacity
            // onPress={onSignUpPress}
            onPress={() => {
              console.log(
                "sign up press",
                firstName,
                lastName,
                emailAddress,
                password
              );
            }}
            style={SignInStyles.buttonBox}
          >
            <Text style={SignInStyles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
      {pendingVerification && (
        <View>
          <View>
            <TextInput
              style={SignInStyles.inputForm}
              placeholderTextColor={Colors.gray}
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity
            onPress={onPressVerify}
            style={SignInStyles.buttonBox}
          >
            <Text style={SignInStyles.buttonText}>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
