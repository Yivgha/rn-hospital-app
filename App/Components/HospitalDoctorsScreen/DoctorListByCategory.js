import {
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { DoctorCardItem } from "../DoctorCardItem";

export function DoctorListByCategory({ selectedDoctors }) {
  return (
    <ScrollView style={styles.doctorListBox} horizontal={false}>
      <FlatList
        horizontal={false}
        scrollEnabled={false}
        data={selectedDoctors}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => console.log("clicked", item.attributes.Name)}
            style={styles.doctorItem}
          >
            <DoctorCardItem doctorInfo={item} />
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  doctorListBox: {
    flexDirection: "column",
  },
  doctorItem: { marginBottom: 15 },
});
