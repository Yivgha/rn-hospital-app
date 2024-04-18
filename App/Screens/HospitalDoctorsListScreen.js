import { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Colors from "../../assets/Shared/Colors";
import { useRoute } from "@react-navigation/native";
import { PageHeader } from "../Components/PageHeader";
import { HospitalDoctorTab } from "../Components/HospitalDoctorsScreen/HospitalDoctorTab";
import { HospitalsListByCategory } from "../Components/HospitalDoctorsScreen/HospitalsListByCategory";
import { DoctorListByCategory } from "../Components/HospitalDoctorsScreen/DoctorListByCategory";
import GlobalApi from "../Services/GlobalApi";

export function HospitalDoctorsListScreen() {
  const param = useRoute();
  const { categoryName, categoryIcon } = param?.params;

  const [selectedHospitals, setSelectedHospitals] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState([]);

  const [activeTab, setActiveTab] = useState("Doctors");

  useEffect(() => {
    getSelectedHospitals();
    getSelectedDoctors();
  }, []);

  const getSelectedHospitals = () => {
    GlobalApi.getHospitalsByCategory(categoryName).then((res) =>
      setSelectedHospitals(res.data.data)
    );
  };

  const getSelectedDoctors = () => {
    GlobalApi.getDoctorsByCategory(categoryName).then((res) =>
      setSelectedDoctors(res.data.data)
    );
  };

  return (
    <View style={styles.pageBox}>
      <PageHeader title={categoryName} categoryIcon={categoryIcon} />
      <HospitalDoctorTab activeTab={(value) => setActiveTab(value)} />

      {!selectedDoctors?.length ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.celestial}
          style={{ marginTop: "50%" }}
        />
      ) : activeTab === "Doctors" ? (
        <DoctorListByCategory
          selectedDoctors={selectedDoctors}
          setSelectedDoctors={setSelectedDoctors}
          categoryName={categoryName}
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
