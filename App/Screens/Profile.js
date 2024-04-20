import { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, FlatList, View } from "react-native";
import Colors from "../../assets/Shared/Colors";
import { Header } from "../Components/Home/Header";
import GlobalApi from "../Services/GlobalApi";
import { DoctorCardItem } from "../Components/DoctorCardItem";

export function Profile() {
  const [favDoctors, setFavDoctors] = useState([]);

  useEffect(() => {
    getFavDoctors();
  }, []);

  const getFavDoctors = () => {
    GlobalApi.getAllFavouritesDoctors()
      .then((res) => setFavDoctors(res.data.data))
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={styles.homeBox} onRefresh={() => getFavDoctors()}>
      <Header style={{ paddingHorizontal: 10 }} />

      {!favDoctors.length && (
        <Text style={[styles.textColor, styles.additionalInfo]}>
          Nothing here yet
        </Text>
      )}
      {favDoctors.length > 0 && (
        <View style={styles.favDocBox}>
          <Text style={styles.textColor}>Your favourite doctors:</Text>

          <FlatList
            data={favDoctors}
            extraData={favDoctors}
            refreshing={false}
            onRefresh={() => getFavDoctors()}
            horizontal={false}
            scrollEnabled={true}
            maxToRenderPerBatch={5}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListStyles}
            renderItem={({ item, index }) => (
              <DoctorCardItem key={index} doctorInfo={item} />
            )}
          />
        </View>
      )}
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
  additionalInfo: {
    alignSelf: "center",
    paddingTop: 15,
  },
  favDocBox: {
    flexDirection: "column",
    gap: 15,
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
