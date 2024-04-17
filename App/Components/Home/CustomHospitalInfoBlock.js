import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../../../assets/Shared/Colors";
import { AntDesign } from "@expo/vector-icons";

export function CustomHospitalInfoBlock({ title, text, icon = false }) {
  return (
    <View style={styles.infoWrapper}>
      <Text style={styles.infoTitle}>{title}</Text>
      {icon === true && (
        <AntDesign name="enviroment" size={19} color={Colors.celestial} />
      )}
      <Text style={styles.hospitalText} textBreakStrategy={"simple"}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoWrapper: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
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
