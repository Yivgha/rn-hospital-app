import { FlatList, StyleSheet } from "react-native";
import { DoctorCardItem } from "../DoctorCardItem";

export function DoctorListExplore({ allDoctors, setAllDoctors }) {
  return (
    <FlatList
      horizontal={false}
      scrollEnabled={true}
      data={allDoctors}
      extraData={allDoctors}
      showsVerticalScrollIndicator={false}
      refreshing={false}
      onRefresh={() => setAllDoctors(allDoctors)}
      contentContainerStyle={styles.doctorListBox}
      renderItem={({ item, index }) => (
        <DoctorCardItem
          doctorInfo={item}
          setAllDoctors={setAllDoctors}
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
