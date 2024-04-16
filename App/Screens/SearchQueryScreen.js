import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { PageHeader } from "../Components/PageHeader";
import Colors from "../../assets/Shared/Colors";
import { HorizontalBreakLine } from "../Components/HorizontalBreakLine";
import { HospitalDoctorTab } from "../Components/HospitalDoctorsScreen/HospitalDoctorTab";
import { DoctorListByCategory } from "../Components/HospitalDoctorsScreen/DoctorListByCategory";
import { HospitalsListByCategory } from "../Components/HospitalDoctorsScreen/HospitalsListByCategory";
import GlobalApi from "../Services/GlobalApi";
import { NothingFound } from "../Components/NothingFound";

export function SearchQueryScreen() {
  const param = useRoute().params.searchText;
  console.log(param);

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
      <ScrollView vertical horizontal={false}>
        <View style={styles.innerBox}>
          <PageHeader title={"Search"} />
          <HorizontalBreakLine style={{ backgroundColor: Colors.gray }} />
          <View style={styles.textBox}>
            <Text style={styles.textColor}>You are looking for:</Text>
            <Text style={styles.searchText}>{param}</Text>
          </View>
          <HorizontalBreakLine style={{ backgroundColor: Colors.gray }} />
          <HospitalDoctorTab activeTab={(value) => setActiveTab(value)} />
          {!selectedDoctors ? (
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
          {activeTab === "Doctors" && selectedDoctors?.length === 0 && (
            <NothingFound buttonBack={false} />
          )}
          {activeTab === "Hospitals" && selectedHospitals?.length === 0 && (
            <NothingFound buttonBack={false} />
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
    flexDirection: "column",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  innerBox: {
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
