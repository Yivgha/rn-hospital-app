import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { DoctorCardItem } from "../DoctorCardItem";
import GlobalApi from "../../Services/GlobalApi";
import { useUser } from "@clerk/clerk-expo";

export function DoctorListByCategory({ selectedDoctors, favDocs }) {
  const { user } = useUser();
  const [doctors, setDoctors] = useState([]);
  const [favDoctorsCat, setFavDoctorsCat] = useState([]);

  useEffect(() => {
    if (!!selectedDoctors) {
      setDoctors(selectedDoctors);
    }
    if (!!favDocs) {
      setFavDoctorsCat(favDocs);
    } else {
      fetchFavDocs();
    }
  }, []);

  const fetchFavDocs = () => {
    const userEmail = user.primaryEmailAddress.emailAddress;
    GlobalApi.getDoctorFavsByEmail(userEmail)
      .then((res) => setFavDoctorsCat(res.data.data))
      .catch((err) => console.log(err));
  };

  return (
    <FlatList
      horizontal={false}
      scrollEnabled={true}
      data={doctors}
      extraData={[doctors, favDoctorsCat]}
      refreshing={false}
      onRefresh={fetchFavDocs}
      contentContainerStyle={styles.doctorListBox}
      renderItem={({ item, index }) => (
        <DoctorCardItem
          doctorInfo={item}
          key={index}
          style={styles.doctorItem}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  doctorListBox: {
    flexDirection: "column",
  },
});
