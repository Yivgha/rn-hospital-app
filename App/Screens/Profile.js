import { View, Text, StyleSheet } from "react-native";
import SignOutGoogle from "../Components/SignOutGoogle";
import { useAuth } from "@clerk/clerk-expo";
import Colors from "../../assets/Shared/Colors";

export function Profile({ navigation }) {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View style={styles.homeBox}>
      <SignOutGoogle signOut={signOut} />
      <Text style={styles.textColor}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  homeBox: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 50,
    gap: 10,
    backgroundColor: Colors.celestial,
  },
  textColor: {
    fontSize: 16,
    color: Colors.white,
  },
});
