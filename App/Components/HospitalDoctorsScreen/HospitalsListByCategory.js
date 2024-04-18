// import { useEffect, useState } from "react";
import {
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { HospitalCardItem } from "../HospitalCardItem";
import { useNavigation } from "@react-navigation/native";
// import GlobalApi from "../../Services/GlobalApi";

export function HospitalsListByCategory({ selectedHospitals }) {
  const navigation = useNavigation();
  return (
    <ScrollView
      style={styles.hospitalsListBox}
      horizontal={false}
      vertical={true}
    >
      <FlatList
        horizontal={false}
        scrollEnabled={false}
        data={selectedHospitals}
        // extraData={selectedHospitals}
        // refreshing={true}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hospitalsListBox: { flexDirection: "column" },
  hospitalItem: { marginBottom: 15 },
});
