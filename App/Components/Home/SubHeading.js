import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../../assets/Shared/Colors";

export function SubHeading({ subHeading, lightText, onPress }) {
  return (
    <View style={styles.captionBox}>
      <Text style={styles.captionText}>{subHeading}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.textColor}>{lightText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  captionBox: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  captionText: {
    fontFamily: "appfontSemibold",
    color: Colors.white,
    fontSize: 18,
  },
  textColor: {
    fontFamily: "appfontLight",
    color: Colors.white,
    fontSize: 18,
  },
});
