import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Colors from "../../../assets/Shared/Colors";
import GlobalApi from "../../Services/GlobalApi";
import { SubHeading } from "./SubHeading";
import { HospitalItem } from "./HospitalItem";

export function PremiumHospitals() {
  const [hospitals, setHospitals] = useState([]);

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
      <SubHeading subHeading={"Our premium hospitals"} lightText={"See All"} />
      <View style={{ flex: 1, flexGrow: 1 }}>
        <FlatList
          data={hospitals}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <HospitalItem hospital={item} key={index} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hospitalsBox: {
    flexDirection: "column",
    gap: 5,
  },
  textColor: {
    fontFamily: "appfont",
    fontSize: 16,
    color: Colors.white,
  },
});
