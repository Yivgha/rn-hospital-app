import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import Colors from "../../assets/Shared/Colors";
import { PageHeader } from "../Components/PageHeader";
import { HospitalDoctorTab } from "../Components/HospitalDoctorsScreen/HospitalDoctorTab";
import { DoctorListExplore } from "../Components/HospitalDoctorsScreen/DoctorsListExplore";
import { HospitalsListByCategory } from "../Components/HospitalDoctorsScreen/HospitalsListByCategory";
import GlobalApi from "../Services/GlobalApi";

export function Explores() {
  const [selectedHospitals, setSelectedHospitals] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);

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
    GlobalApi.getAllDoctors().then((res) => setAllDoctors(res.data.data));
  };

  return (
    <SafeAreaView style={styles.pageBox}>
      <ScrollView vertical={true} horizontal={false}>
        <View style={styles.innerBox}>
          <PageHeader title={"Explores"} />
          <HospitalDoctorTab activeTab={(value) => setActiveTab(value)} />
          {!allDoctors?.length ? (
            <ActivityIndicator
              size={"large"}
              color={Colors.celestial}
              style={{ marginTop: "50%" }}
            />
          ) : activeTab === "Doctors" ? (
            <DoctorListExplore
              allDoctors={allDoctors}
              setAllDoctors={setAllDoctors}
            />
          ) : (
            <HospitalsListByCategory selectedHospitals={selectedHospitals} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
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
