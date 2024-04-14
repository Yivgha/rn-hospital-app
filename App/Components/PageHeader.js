import { View, Text, StyleSheet } from "react-native";
import { GoBackBtn } from "../Components/GoBackBtn";
import Colors from "../../assets/Shared/Colors";

export function PageHeader({ categoryName }) {
  return (
    <View style={styles.pageHeaderBox}>
      <GoBackBtn />
      <Text style={styles.textColor}>{categoryName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pageHeaderBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textColor: {
    fontFamily: "appfontBold",
    fontSize: 18,
    color: Colors.celestial,
    textTransform: "uppercase",
  },
});
