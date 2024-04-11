import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import Colors from "../../assets/Shared/Colors";

export default function SignOutGoogle() {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <TouchableOpacity
      style={styles.buttonBox}
      title="Sign Out"
      onPress={() => signOut()}
    >
      <Text style={styles.buttonText}>Sign Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    paddingVertical: 10,
    paddingHorizontal: "auto",
    borderRadius: 90,
    minWidth: 90,
    alignItems: "center",
    marginHorizontal: "auto",
    backgroundColor: Colors.white,
    alignSelf: "flex-end",
  },
  buttonText: {
    fontSize: 12,
    color: Colors.celestial,
    textTransform: "uppercase",
    fontWeight: "700",
  },
});
