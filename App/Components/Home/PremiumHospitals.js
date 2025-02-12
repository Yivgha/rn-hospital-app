import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Colors from "../../../assets/Shared/Colors";
import GlobalApi from "../../Services/GlobalApi";
import { SubHeading } from "./SubHeading";
import { HospitalItem } from "./HospitalItem";
import { useNavigation } from "@react-navigation/native";

export function PremiumHospitals() {
  const [hospitals, setHospitals] = useState([]);

  const navigation = useNavigation();

  if (!hospitals) {
    return null;
  }

  const fetchHospitals = () => {
    GlobalApi.getPremiumHospitals().then((res) => setHospitals(res.data.data));
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  return (
    <View style={styles.hospitalsBox}>
      <SubHeading
        subHeading={"Our premium hospitals"}
        lightText={"See All"}
        onPress={() => {
          navigation.navigate("PremiumHospitals");
        }}
      />

      <FlatList
        data={hospitals}
        extraData={hospitals}
        refreshing={false}
        onRefresh={() => fetchHospitals()}
        horizontal
        contentContainerStyle={{ gap: 10 }}
        showsHorizontalScrollIndicator={false}
        maxToRenderPerBatch={5}
        renderItem={({ item, index }) => (
          <HospitalItem hospital={item} key={index} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hospitalsBox: {
    flexDirection: "column",
    gap: 15,
  },
  textColor: {
    fontFamily: "appfont",
    fontSize: 16,
    color: Colors.white,
  },
});
