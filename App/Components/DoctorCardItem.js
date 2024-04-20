import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Colors from "../../assets/Shared/Colors";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import GlobalApi from "../Services/GlobalApi";
import { useUser } from "@clerk/clerk-expo";

export function DoctorCardItem({
  doctorInfo,
  setSelectedDoctors,
  setAllDoctors,
  categoryName,
  favDoctorsList,
  favItemId,
}) {
  const navigation = useNavigation();
  const { user } = useUser();

  const [pressedHeart, setPressedHeart] = useState(false);
  const [favouritesDocs, setFavouritesDocs] = useState(favDoctorsList ?? []);

  const { Name, categories, Years_Of_Experience } = doctorInfo.attributes;

  const filterDoctor = favouritesDocs?.find((el) => el.id === doctorInfo.id);
  const filteredID = filterDoctor?.id;

  // useEffect(() => {
  //   if (filteredID === doctorInfo.id) {
  //     setPressedHeart(true);
  //     console.log("changed heart to true");
  //   } else {
  //     setPressedHeart(false);
  //     console.log("changed heart to false");
  //   }
  // }, []);

  const toggleFavourite = (doctorId) => {
    if (user) {
      const data = {
        data: {
          UserName: user.fullName,
          UserEmail: user.primaryEmailAddress.emailAddress,
          doctors: doctorId,
        },
      };

      if (doctorId === filteredID) {
        console.log("should delete");
        GlobalApi.deleteFavouriteDoctorByUserEmail(favItemId)
          .then((res) => {
            console.log("del favitem", favItemId);
            setPressedHeart(pressedHeart === false);
          })
          .catch((err) => console.log(err));
      } else {
        GlobalApi.createFavouriteDoctorByUserEmail(data)
          .then((res) => {
            console.log("created new");
            setPressedHeart(pressedHeart === true);
          })
          .catch((err) => console.log(err));
      }

      if (!!setAllDoctors) {
        GlobalApi.getAllDoctors()
          .then((res) => setAllDoctors(res.data.data))
          .catch((err) => console.log(err));
      }
      if (!!setSelectedDoctors) {
        GlobalApi.getDoctorsByCategory(categoryName).then((res) =>
          setSelectedDoctors(res.data.data)
        );
      }
    }
  };

  const fetchFavDocsList = () => {
    GlobalApi.getUserFavouriteDoctors()
      .then((res) => setFavouritesDocs(res.data.data))
      .catch((err) => console.log(err.message));
  };

  return (
    <View style={styles.hospitalCardBox}>
      <TouchableOpacity
        style={{ gap: 10, paddingBottom: 5 }}
        onPress={() => {
          navigation.navigate("DoctorDetails", { doctor: doctorInfo });
        }}
      >
        <Image
          source={{ uri: doctorInfo.attributes.Image.data.attributes.url }}
          style={styles.hospitalImg}
        />
        <View style={styles.infoWrapper}>
          <View style={styles.innerBox}>
            <Text style={styles.hospitalTitle}>{Name}</Text>
            <Text style={styles.yearsText}>
              Years of experience: {Years_Of_Experience}
            </Text>
            <FlatList
              data={categories.data}
              extraData={[categories.data, doctorInfo, favouritesDocs]}
              refreshing={false}
              onRefresh={() => {
                if (!!setAllDoctors) {
                  GlobalApi.getAllDoctors()
                    .then((res) => setAllDoctors(res.data.data))
                    .catch((err) => console.log(err));
                }
                if (!!setSelectedDoctors) {
                  GlobalApi.getDoctorsByCategory(categoryName).then((res) =>
                    setSelectedDoctors(res.data.data)
                  );
                }
              }}
              horizontal={false}
              scrollEnabled={false}
              numColumns={3}
              contentContainerStyle={{ flexDirection: "row" }}
              renderItem={({ item, index }) => (
                <Text key={index} style={styles.categoriesText}>
                  {item.attributes.Name}
                </Text>
              )}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              console.log("pressed heart by doctor id", doctorInfo.id);
              toggleFavourite(doctorInfo.id);
            }}
          >
            {filteredID === doctorInfo.id ? (
              <AntDesign name="heart" size={24} color={Colors.celestial} />
            ) : (
              <AntDesign name="hearto" size={24} color={Colors.celestial} />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.appointmentBtn}
        onPress={() =>
          navigation.navigate("BookAppointment", { doctor: doctorInfo })
        }
      >
        <Text style={styles.appointmentBtnText}>Make an appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  hospitalCardBox: {
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    gap: 5,
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginBottom: 15,
  },
  hospitalImg: {
    height: 190,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  hospitalTitle: {
    fontFamily: "appfontBold",
    fontSize: 18,
    color: Colors.celestial,
  },
  yearsText: {
    fontFamily: "appfont",
    fontSize: 16,
    color: Colors.celestial,
  },
  categoriesText: {
    fontFamily: "appfontLight",
    fontSize: 14,
    color: Colors.gray,
    marginRight: 10,
  },
  infoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 15,
  },
  innerBox: {
    paddingHorizontal: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    gap: 5,
  },
  appointmentBtn: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.celestial,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: "auto",
    borderRadius: 10,
  },
  appointmentBtnText: {
    fontFamily: "appfontLight",
    fontSize: 16,
    color: Colors.white,
  },
});
