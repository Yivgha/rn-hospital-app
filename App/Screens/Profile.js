import { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Pressable,
} from "react-native";
import Colors from "../../assets/Shared/Colors";
import { Header } from "../Components/Home/Header";
import GlobalApi from "../Services/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import { FavouriteDoctorsList } from "../Components/ProfileScreen/FavouriteDoctorsList";
import { Feather } from "@expo/vector-icons";

export function Profile() {
  const [favDoctors, setFavDoctors] = useState([]);
  const { user } = useUser();

  const getFavDoctors = () => {
    const userEmail = user.primaryEmailAddress.emailAddress;
    GlobalApi.getUserFavouriteDoctors(userEmail)
      .then((res) => {
        setFavDoctors(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFavDoctors();
  }, []);

  return (
    <SafeAreaView style={styles.homeBox}>
      <Header style={{ paddingHorizontal: 10 }} />
      <View style={styles.textBox}>
        {!favDoctors?.length ? (
          <Text style={[styles.textColor, styles.additionalInfo]}>
            Nothing here yet
          </Text>
        ) : (
          <Text style={styles.textColor}>Your favourite doctors:</Text>
        )}
        <Pressable onPress={() => getFavDoctors()} style={styles.refreshBtn}>
          <Feather name="refresh-cw" size={24} color={Colors.lightGray} />
        </Pressable>
      </View>

      {favDoctors?.length > 0 && (
        <View style={styles.favDocBox}>
          <FlatList
            data={favDoctors}
            extraData={favDoctors}
            refreshing={false}
            onRefresh={getFavDoctors}
            horizontal={false}
            scrollEnabled={true}
            maxToRenderPerBatch={5}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListStyles}
            renderItem={({ item }) => <FavouriteDoctorsList favList={item} />}
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
    paddingBottom: 115,
  },
  textBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  refreshBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
  },
  favDocBox: {
    flexDirection: "column",
    gap: 15,
  },
  flatListStyles: {
    backgroundColor: Colors.sky,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 10,
  },
  textColor: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: "appfont",
  },
});
