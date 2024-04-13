import { View, Text, StyleSheet } from "react-native";
import Colors from "../../../assets/Shared/Colors";

export function SubHeading({ subHeading, lightText }) {
  return (
    <View style={styles.captionBox}>
      <Text style={styles.captionText}>{subHeading}</Text>
      <Text style={styles.textColor}>{lightText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  captionBox: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 15,
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
