import { View, StyleSheet } from "react-native";
import Colors from "../../assets/Shared/Colors";

export function HorizontalBreakLine() {
  return <View style={styles.lineStyle}></View>;
}

const styles = StyleSheet.create({
  lineStyle: {
    backgroundColor: Colors.lightGray,
    height: 1,
  },
});
