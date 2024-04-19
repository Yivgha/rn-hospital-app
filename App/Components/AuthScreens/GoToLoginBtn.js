import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../../assets/Shared/Colors";
import { Ionicons } from "@expo/vector-icons";

export function GoToLoginBtn({ onPress }) {
  return (
    <TouchableOpacity style={styles.buttonBox} onPress={onPress}>
      <Ionicons name="arrow-back" size={18} color={Colors.white} />
      <Text style={styles.buttonText}>Go to login</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    flexDirection: "row",
    gap: 5,
    paddingVertical: 13,
    borderRadius: 90,
    justifyContent: "center",
    alignSelf: "left",
    maxWidth: 130,
    backgroundColor: Colors.black,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: "appfontLight",
  },
});
