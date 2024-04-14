import { View, Text, StyleSheet, Image } from "react-native";
import { GoBackBtn } from "../Components/GoBackBtn";
import Colors from "../../assets/Shared/Colors";

export function PageHeader({ categoryName, categoryIcon }) {
  return (
    <View style={styles.pageHeaderBox}>
      <GoBackBtn />
      <View style={styles.infoBox}>
        <Image
          source={{ uri: categoryIcon }}
          style={{ height: 30, width: 30 }}
        />
        <Text style={styles.textColor}>{categoryName}</Text>
      </View>
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
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
