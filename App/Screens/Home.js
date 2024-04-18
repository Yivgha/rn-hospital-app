import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
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
    <SafeAreaView style={styles.homeBox}>
      <Header />
      <ScrollView horizontal={false} vertical={true}>
        <View style={{ gap: 25 }}>
          <Search setSearchText={setSearchText} searchText={searchText} />

          <Slider />
          <Categories />

          <PremiumHospitals />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeBox: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 15,
    backgroundColor: Colors.celestial,
  },
});
