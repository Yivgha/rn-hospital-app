import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import Colors from "../../assets/Shared/Colors";

export default function Home() {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View style={styles.homeBox}>
      <TouchableOpacity
        style={styles.buttonBox}
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <View>
        <Text style={{ color: Colors.white }}>Home</Text>
      </View>
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
