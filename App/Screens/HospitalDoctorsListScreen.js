import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Colors from "../../assets/Shared/Colors";
import { useRoute } from "@react-navigation/native";
import { PageHeader } from "../Components/PageHeader";
import { HospitalDoctorTab } from "../Components/HospitalDoctorsScreen/HospitalDoctorTab";
import { HospitalsListByCategory } from "../Components/HospitalDoctorsScreen/HospitalsListByCategory";
import GlobalApi from "../Services/GlobalApi";

export function HospitalDoctorsListScreen() {
  const param = useRoute();
  const { categoryName, categoryId, categoryIcon } = param?.params;

  const [selectedHospitals, setSelectedHospitals] = useState([]);

  useEffect(() => {
    getSelectedHospitals();
  }, []);

  const getSelectedHospitals = () => {
    GlobalApi.getHospitalsByCategory(categoryName).then((res) =>
      setSelectedHospitals(res.data.data)
    );
  };
  return (
    <View style={styles.pageBox}>
      <PageHeader categoryName={categoryName} categoryIcon={categoryIcon} />

      <HospitalDoctorTab />

      {!selectedHospitals?.length ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.celestial}
          style={{ marginTop: "50%" }}
        />
      ) : (
        <HospitalsListByCategory selectedHospitals={selectedHospitals} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pageBox: {
    flex: 1,
    flexDirection: "column",
    padding: 15,
    gap: 19,
    backgroundColor: Colors.sky,
  },
});
