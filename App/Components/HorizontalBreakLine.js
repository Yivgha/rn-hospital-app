import { View, StyleSheet } from "react-native";
import Colors from "../../assets/Shared/Colors";

export function HorizontalBreakLine({ style }) {
  return <View style={[styles.lineStyle, style]}></View>;
}

const styles = StyleSheet.create({
  lineStyle: {
    backgroundColor: Colors.lightGray,
    height: 1,
  },
});
