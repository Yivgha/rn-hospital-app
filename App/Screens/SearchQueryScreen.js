import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { PageHeader } from "../Components/PageHeader";
import Colors from "../../assets/Shared/Colors";
import { HorizontalBreakLine } from "../Components/HorizontalBreakLine";
import { HospitalDoctorTab } from "../Components/HospitalDoctorsScreen/HospitalDoctorTab";
import { DoctorListByCategory } from "../Components/HospitalDoctorsScreen/DoctorListByCategory";
import { HospitalsListByCategory } from "../Components/HospitalDoctorsScreen/HospitalsListByCategory";
import GlobalApi from "../Services/GlobalApi";
import { NothingFound } from "../Components/NothingFound";
import { DoctorListExplore } from "../Components/HospitalDoctorsScreen/DoctorsListExplore";

export function SearchQueryScreen() {
  const param = useRoute().params.searchText;

  const [selectedHospitals, setSelectedHospitals] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState([]);

  const [activeTab, setActiveTab] = useState("Doctors");

  useEffect(() => {
    getHospitalsBySearchName();
    getDoctorsBySearchName();
  }, []);

  const getHospitalsBySearchName = () => {
    GlobalApi.getHospitalsBySearchName(param).then((res) =>
      setSelectedHospitals(res.data.data)
    );
  };

  const getDoctorsBySearchName = () => {
    GlobalApi.getDoctorsBySearchName(param).then((res) =>
      setSelectedDoctors(res.data.data)
    );
  };

  return (
    <View style={styles.pageBox}>
      <PageHeader title={"Search"} />
      <HorizontalBreakLine style={{ backgroundColor: Colors.gray }} />
      <View style={styles.textBox}>
        <Text style={styles.textColor}>You are looking for:</Text>
        <Text style={styles.searchText}>{param}</Text>
      </View>
      <HorizontalBreakLine style={{ backgroundColor: Colors.gray }} />
      <HospitalDoctorTab
        activeTab={(value) => {
          setActiveTab(value);
        }}
      />
      {!selectedDoctors.length && activeTab === "Doctors" ? (
        <NothingFound buttonBack={false} />
      ) : activeTab === "Doctors" ? (
        <DoctorListExplore
          allDoctors={selectedDoctors}
          setAllDoctors={setSelectedDoctors}
        />
      ) : activeTab === "Hospitals" && !selectedHospitals.length ? (
        <NothingFound buttonBack={false} />
      ) : (
        <HospitalsListByCategory selectedHospitals={selectedHospitals} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pageBox: {
    flex: 1,
    backgroundColor: Colors.sky,
    flexDirection: "column",
    paddingVertical: 15,
    paddingHorizontal: 10,
    gap: 15,
  },

  textBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
    alignSelf: "center",
    paddingVertical: 5,
    flexWrap: "wrap",
  },
  textColor: {
    fontFamily: "appfont",
    fontSize: 18,
    color: Colors.celestial,
  },
  searchText: {
    fontFamily: "appfontBold",
    fontSize: 20,
    color: Colors.celestial,
  },
});
