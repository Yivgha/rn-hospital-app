import {
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { HospitalCardItem } from "../HospitalCardItem";
import { useNavigation } from "@react-navigation/native";

export function HospitalsListByCategory({ selectedHospitals }) {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.hospitalsListBox} horizontal={false}>
      <FlatList
        horizontal={false}
        scrollEnabled={false}
        data={selectedHospitals}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("HospitalDetails", { hospitalDetails: item })
            }
            style={styles.hospitalItem}
          >
            <HospitalCardItem hospitalInfo={item} />
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hospitalsListBox: { flexDirection: "column" },
  hospitalItem: { marginBottom: 15 },
});
