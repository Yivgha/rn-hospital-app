import { ScrollView, FlatList, StyleSheet } from "react-native";
import { DoctorCardItem } from "../DoctorCardItem";

export function DoctorListByCategory({ selectedDoctors }) {
  return (
    <ScrollView style={styles.doctorListBox} horizontal={false}>
      <FlatList
        horizontal={false}
        scrollEnabled={false}
        data={selectedDoctors}
        renderItem={({ item, index }) => (
          <DoctorCardItem
            doctorInfo={item}
            key={index}
            style={styles.doctorItem}
          />
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  doctorListBox: {
    flexDirection: "column",
  },
});
