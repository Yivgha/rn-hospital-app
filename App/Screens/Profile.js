import { View, Text, StyleSheet } from "react-native";
import Colors from "../../assets/Shared/Colors";
import { Header } from "../Components/Home/Header";

export function Profile() {
  return (
    <View style={styles.homeBox}>
      <Header />
      <Text style={styles.textColor}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  homeBox: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 10,
    backgroundColor: Colors.celestial,
  },
  textColor: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: "appfont",
  },
});
