import { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import Colors from "../../assets/Shared/Colors";
import { Header } from "../Components/Home/Header";
import GlobalApi from "../Services/GlobalApi";
import { DoctorCardItem } from "../Components/DoctorCardItem";

export function Profile() {
  const [favDoctors, setFavDoctors] = useState([]);

  if (!favDoctors) {
    return null;
  }

  useEffect(() => {
    getFavDoctors();
  }, []);

  const getFavDoctors = () => {
    GlobalApi.getAllFavouritesDoctors()
      .then((res) => setFavDoctors(res.data.data))
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={styles.homeBox}>
      <Header style={{ paddingHorizontal: 10 }} />
      <Text style={styles.textColor}>Your favourite doctors:</Text>
      <FlatList
        data={favDoctors}
        extraData={favDoctors}
        horizontal={false}
        scrollEnabled={true}
        maxToRenderPerBatch={5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListStyles}
        renderItem={({ item, index }) => (
          <DoctorCardItem key={index} doctorInfo={item} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeBox: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
    gap: 15,
    backgroundColor: Colors.celestial,
  },
  flatListStyles: {
    backgroundColor: Colors.sky,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  textColor: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: "appfont",
    paddingHorizontal: 10,
  },
});
