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

export function DoctorCardItem({ doctorInfo }) {
  const navigation = useNavigation();
  const { user } = useUser();

  const [pressedHeart, setPressedHeart] = useState(false);

  const { Name, categories, Years_Of_Experience } = doctorInfo.attributes;

  // const handleFavourite = (item) => {
  //   let data = {};
  //   if (doctorInfo) {
  //     data = {
  //       data: {
  //         doctors: item?.id,
  //         UserName: user.fullName,
  //         UserEmail: user.primaryEmailAddress.emailAddress,
  //         isFavourite: true,
  //       },
  //     };
  //   }

  //   GlobalApi.addFavouriteDoctor(data).then((res) =>
  //     console.log(res.data.data)
  //   );
  // };

  return (
    <View style={styles.hospitalCardBox}>
      <TouchableOpacity
        style={{ gap: 10, paddingBottom: 5 }}
        onPress={() => {
          console.log("pressed", doctorInfo.attributes.Name),
            navigation.navigate("DoctorDetails", { doctor: doctorInfo });
        }}
      >
        <Image
          source={{ uri: doctorInfo.attributes.Image.data.attributes.url }}
          style={styles.hospitalImg}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 15,
          }}
        >
          <View style={styles.innerBox}>
            <Text style={styles.hospitalTitle}>{Name}</Text>
            <Text style={styles.yearsText}>
              Years of experience: {Years_Of_Experience}
            </Text>
            <FlatList
              data={categories.data}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              numColumns={3}
              contentContainerStyle={{ flexDirection: "row" }}
              renderItem={({ item, index }) => (
                <Text key={index} style={styles.categoriesText}>
                  {item.attributes.Name}
                </Text>
              )}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                console.log("pressed heart", doctorInfo.id);
                setPressedHeart(!pressedHeart);
                // handleFavourite(doctorInfo);
              }}
            >
              {pressedHeart === false && (
                <AntDesign name="hearto" size={24} color={Colors.celestial} />
              )}
              {pressedHeart === true && (
                <AntDesign name="heart" size={24} color={Colors.celestial} />
              )}
            </TouchableOpacity>
          </View>
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
