import { FlatList, StyleSheet } from "react-native";
import { DoctorCardItem } from "../DoctorCardItem";

export function DoctorListByCategory({
  selectedDoctors,
  setSelectedDoctors,
  categoryName,
}) {
  return (
    <FlatList
      horizontal={false}
      scrollEnabled={true}
      data={selectedDoctors}
      extraData={selectedDoctors}
      contentContainerStyle={styles.doctorListBox}
      renderItem={({ item, index }) => (
        <DoctorCardItem
          doctorInfo={item}
          categoryName={categoryName}
          setSelectedDoctors={setSelectedDoctors}
          key={index}
          style={styles.doctorItem}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  doctorListBox: {
    flexDirection: "column",
  },
});
