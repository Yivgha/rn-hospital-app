import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import Colors from "../../assets/Shared/Colors";
import { Header } from "../Components/Home/Header";
import { Search } from "../Components/Home/Search";
import { Slider } from "../Components/Home/Slider";

export function Home() {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.homeBox}>
      <Header />
      <Search setSearchText={setSearchText} />
      <Text style={styles.textColor}>This is search text: {searchText}</Text>
      <Slider />
    </View>
  );
}

const styles = StyleSheet.create({
  homeBox: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 20,
    backgroundColor: Colors.celestial,
  },
  textColor: {
    fontFamily: "appfont",
    fontSize: 16,
    color: Colors.white,
  },
});
