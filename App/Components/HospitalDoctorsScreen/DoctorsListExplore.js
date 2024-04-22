import { FlatList, StyleSheet } from "react-native";
import { DoctorCardItem } from "../DoctorCardItem";

export function DoctorListExplore({
  allDoctors,
  favDocs,
  favItems,
  getAllDoctors,
}) {
  return (
    <FlatList
      horizontal={false}
      scrollEnabled={true}
      data={allDoctors}
      extraData={[allDoctors, favDocs, favItems]}
      showsVerticalScrollIndicator={false}
      refreshing={false}
      onRefresh={getAllDoctors}
      contentContainerStyle={styles.doctorListBox}
      renderItem={({ item, index }) => {
        return (
          <DoctorCardItem
            doctorInfo={item}
            key={index}
            style={styles.doctorItem}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  doctorListBox: {
    flexDirection: "column",
  },
});
