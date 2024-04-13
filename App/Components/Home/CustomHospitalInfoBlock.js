import { View, Text, StyleSheet } from "react-native";
import Colors from "../../../assets/Shared/Colors";

export function CustomHospitalInfoBlock({ title, text }) {
  return (
    <View style={styles.infoWrapper}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.hospitalText} textBreakStrategy={"simple"}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoWrapper: { flexDirection: "row", gap: 5 },
  infoTitle: {
    fontFamily: "appfontSemibold",
    fontSize: 14,
    color: Colors.peach,
  },
  hospitalText: {
    fontFamily: "appfontLight",
    fontStyle: "italic",
    opacity: 0.7,
    fontSize: 16,
    color: Colors.celestial,
  },
});
