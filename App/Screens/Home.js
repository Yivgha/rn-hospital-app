import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import Colors from "../../assets/Shared/Colors";
import { Header } from "../Components/Home/Header";
import { Search } from "../Components/Home/Search";
import { Slider } from "../Components/Home/Slider";
import { Categories } from "../Components/Home/Categories";
import { PremiumHospitals } from "../Components/Home/PremiumHospitals";

export function Home() {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.homeBox}>
      <Header />
      <ScrollView horizontal={false}>
        <Search setSearchText={setSearchText} />
        {searchText.length > 0 && (
          <View style={styles.textSearchInfo}>
            <Text style={styles.textColor}>
              This is what you're looking for:
            </Text>
            <Text style={styles.textSearchResult}>{searchText}</Text>
          </View>
        )}

        <Slider />
        <Categories />

        <PremiumHospitals />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  homeBox: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 25,
    backgroundColor: Colors.celestial,
  },
  textSearchInfo: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    alignItems: "baseline",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  textColor: {
    fontFamily: "appfont",
    fontSize: 16,
    color: Colors.white,
  },
  textSearchResult: {
    fontFamily: "appfontBold",
    fontSize: 16,
    color: Colors.peach,
  },
});
