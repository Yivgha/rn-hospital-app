import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../assets/Shared/Colors";
import { useRoute } from "@react-navigation/native";
import { PageHeader } from "../Components/PageHeader";
import { HospitalDoctorTab } from "../Components/HospitalDoctorsScreen/HospitalDoctorTab";
import { HospitalsListByCategory } from "../Components/HospitalDoctorsScreen/HospitalsListByCategory";
import { DoctorListByCategory } from "../Components/HospitalDoctorsScreen/DoctorListByCategory";
import GlobalApi from "../Services/GlobalApi";
import { NothingFound } from "../Components/NothingFound";

export function HospitalDoctorsListScreen() {
  const param = useRoute();
  const { categoryName, categoryIcon } = param?.params;

  const [selectedHospitals, setSelectedHospitals] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState([]);

  const [activeTab, setActiveTab] = useState("Doctors");

  // const [pressedHeart, setPressedHeart] = useState(false);

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

      {activeTab === "Doctors" &&
        ((!selectedDoctors.length && (
          <NothingFound buttonBack={false} style={{ paddingTop: 100 }} />
        )) ||
          (selectedDoctors.length > 0 && (
            <DoctorListByCategory
              selectedDoctors={selectedDoctors}
              setSelectedDoctors={setSelectedDoctors}
              categoryName={categoryName}
              // pressedHeart={pressedHeart}
              // setPressedHeart={setPressedHeart}
            />
          )))}

      {activeTab === "Hospitals" &&
        ((selectedHospitals.length > 0 && (
          <HospitalsListByCategory selectedHospitals={selectedHospitals} />
        )) ||
          (!selectedHospitals.length && (
            <NothingFound buttonBack={false} style={{ paddingTop: 100 }} />
          )))}
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
