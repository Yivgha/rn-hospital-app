import {
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { HospitalCardItem } from "../HospitalCardItem";

export function HospitalsListByCategory({ selectedHospitals }) {
  return (
    <ScrollView style={styles.hospitalsListBox} horizontal={false}>
      <FlatList
        horizontal={false}
        scrollEnabled={false}
        data={selectedHospitals}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => console.log("clicked", item.attributes.Name)}
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
