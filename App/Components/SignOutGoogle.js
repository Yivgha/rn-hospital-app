import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Colors from "../../assets/Shared/Colors";

export default function SignOutGoogle({ signOut }) {
  return (
    <TouchableOpacity
      style={styles.buttonBox}
      title="Sign Out"
      onPress={() => {
        signOut();
      }}
    >
      <Text style={styles.buttonText}>Sign Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    padding: 10,
    borderRadius: 90,
    alignItems: "center",
    width: 130,
    marginHorizontal: "auto",
    backgroundColor: Colors.black,
    alignSelf: "flex-end",
  },
  buttonText: {
    fontSize: 16,
    color: Colors.white,
  },
});
