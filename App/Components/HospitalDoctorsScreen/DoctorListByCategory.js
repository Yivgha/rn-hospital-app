import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { DoctorCardItem } from "../DoctorCardItem";

export function DoctorListByCategory({
  selectedDoctors,
  setSelectedDoctors,
  categoryName,
}) {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (!!selectedDoctors) {
      setDoctors(selectedDoctors);
    }
  }, []);

  return (
    <FlatList
      horizontal={false}
      scrollEnabled={true}
      data={doctors}
      extraData={doctors}
      refreshing={true}
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
