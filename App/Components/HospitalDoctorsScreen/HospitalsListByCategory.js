import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { HospitalCardItem } from "../HospitalCardItem";
import { useNavigation } from "@react-navigation/native";
// import GlobalApi from "../../Services/GlobalApi";

export function HospitalsListByCategory({ selectedHospitals }) {
  const navigation = useNavigation();

  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    if (!!selectedHospitals) {
      setHospitals(selectedHospitals);
    }
  }, []);
  return (
    <View style={styles.hospitalsListBox}>
      <FlatList
        horizontal={false}
        scrollEnabled={true}
        data={hospitals}
        extraData={hospitals}
        refreshing={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        onRefresh={() => setHospitals(selectedHospitals)}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              // handleEditViews(item);
              navigation.navigate("HospitalDetails", { hospitalDetails: item });
            }}
            style={styles.hospitalItem}
          >
            <HospitalCardItem hospitalInfo={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hospitalsListBox: { flexDirection: "column", paddingBottom: 100 },
  hospitalItem: { marginBottom: 15 },
});
