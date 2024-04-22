import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import Colors from "../../assets/Shared/Colors";
import { PageHeader } from "../Components/PageHeader";
import { HospitalDoctorTab } from "../Components/HospitalDoctorsScreen/HospitalDoctorTab";
import { DoctorListExplore } from "../Components/HospitalDoctorsScreen/DoctorsListExplore";
import { HospitalsListByCategory } from "../Components/HospitalDoctorsScreen/HospitalsListByCategory";
import GlobalApi from "../Services/GlobalApi";
import { useUser } from "@clerk/clerk-expo";

export function Explores() {
  const { user } = useUser();
  const userEmail = user.primaryEmailAddress.emailAddress;
  const [selectedHospitals, setSelectedHospitals] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);

  const [favDocs, setFavDocs] = useState([]);
  const [favItems, setFavItems] = useState([]);

  // console.log("fav docs on explore", favDocs);

  const [activeTab, setActiveTab] = useState("Doctors");
  useEffect(() => {
    getAllHospitals();
    getAllDoctors();
    fetchFavDocsList();
    getFavItems();
  }, []);

  const getAllHospitals = () => {
    GlobalApi.getAllHospitals().then((res) =>
      setSelectedHospitals(res.data.data)
    );
  };

  const getFavItems = () => {
    GlobalApi.getUserFavouriteDoctors(userEmail)
      .then((res) => setFavItems(res.data.data))
      .catch((err) => console.log(err));
  };

  const getAllDoctors = () => {
    GlobalApi.getAllDoctors().then((res) => setAllDoctors(res.data.data));
  };

  const fetchFavDocsList = () => {
    const userEmail = user.primaryEmailAddress.emailAddress;
    GlobalApi.getDoctorFavsByEmail(userEmail)
      .then((res) => setFavDocs(res.data.data))
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={styles.pageBox}>
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
            favDocs={favDocs}
            favItems={favItems}
            getAllDoctors={getAllDoctors}
          />
        ) : (
          <HospitalsListByCategory selectedHospitals={selectedHospitals} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageBox: {
    flex: 1,
    backgroundColor: Colors.sky,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 110,
  },
  innerBox: {
    flexDirection: "column",
    gap: 15,
  },
});
