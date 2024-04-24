import { View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SignInStyles from "../../../assets/Shared/SignInStyles";
import Colors from "../../../assets/Shared/Colors";

export function CustomInput({
  value,
  setValue,
  secureTextEntry,
  placeholder,
  toggleSecureEntry,
}) {
  const isPassword = placeholder === "Password...";

  return (
    <View style={SignInStyles.inputContainer}>
      <TextInput
        style={SignInStyles.inputForm}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
        onChangeText={(value) => setValue(value)}
      />

      {isPassword && (
        <TouchableOpacity
          style={SignInStyles.toggleButton}
          onPress={toggleSecureEntry}
        >
          <MaterialIcons
            name={secureTextEntry ? "visibility-off" : "visibility"}
            size={24}
            color={Colors.gray}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
