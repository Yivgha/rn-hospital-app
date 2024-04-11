import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import Colors from "../../assets/Shared/Colors";
import { Header } from "../Components/Home/Header";
import { Search } from "../Components/Home/Search";

export function Home() {
  const [searchText, setSearchText] = useState("");
  console.log("searchText", searchText.length);
  return (
    <View style={styles.homeBox}>
      <Header />
      <Search setSearchText={setSearchText} />
      <Text>This is search text: {searchText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  homeBox: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 30,
    backgroundColor: Colors.celestial,
  },
});
