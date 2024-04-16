import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Colors from "../../assets/Shared/Colors";
import { PageHeader } from "../Components/PageHeader";
import { HospitalDoctorTab } from "../Components/HospitalDoctorsScreen/HospitalDoctorTab";
import { DoctorListByCategory } from "../Components/HospitalDoctorsScreen/DoctorListByCategory";
import { HospitalsListByCategory } from "../Components/HospitalDoctorsScreen/HospitalsListByCategory";
import GlobalApi from "../Services/GlobalApi";

export function Explores() {
  const [selectedHospitals, setSelectedHospitals] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState([]);

  const [activeTab, setActiveTab] = useState("Doctors");
  useEffect(() => {
    getAllHospitals();
    getAllDoctors();
  }, []);

  const getAllHospitals = () => {
    GlobalApi.getAllHospitals().then((res) =>
      setSelectedHospitals(res.data.data)
    );
  };

  const getAllDoctors = () => {
    GlobalApi.getAllDoctors().then((res) => setSelectedDoctors(res.data.data));
  };

  return (
    <View style={styles.pageBox} vertical={true} horizontal={false}>
      <ScrollView>
        <View style={styles.innerBox}>
          <PageHeader title={"Explores"} />
          <HospitalDoctorTab activeTab={(value) => setActiveTab(value)} />
          {!selectedDoctors?.length ? (
            <ActivityIndicator
              size={"large"}
              color={Colors.celestial}
              style={{ marginTop: "50%" }}
            />
          ) : activeTab === "Doctors" ? (
            <DoctorListByCategory selectedDoctors={selectedDoctors} />
          ) : (
            <HospitalsListByCategory selectedHospitals={selectedHospitals} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageBox: {
    flex: 1,
    backgroundColor: Colors.sky,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  innerBox: {
    flexDirection: "column",
    gap: 30,
  },
});
