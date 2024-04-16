import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Colors from "../../assets/Shared/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NothingFound } from "../Components/NothingFound";
import { PageHeader } from "../Components/PageHeader";
import { HospitalInfo } from "../Components/HospitalDetailsScreen/HospitalInfo";

export function HospitalDetails() {
  const [hospital, setHospital] = useState({});

  const navigation = useNavigation();

  const param = useRoute();
  useEffect(() => {
    setHospital(param.params.hospitalDetails.attributes);
  }, []);

  if (!hospital) {
    return <NothingFound />;
  }

  return (
    hospital && (
      <View style={styles.hospitalBox}>
        <ScrollView horizontal={false}>
          <View style={styles.infoBox}>
            <View style={styles.pageHeader}>
              <PageHeader title={hospital.Name} />
            </View>

            <Image
              source={{ uri: hospital?.Image?.data.attributes.url }}
              style={styles.hospitalImg}
            />
            <View style={styles.detailedBox}>
              <HospitalInfo hospital={hospital} />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() =>
            navigation.navigate("BookAppointment", { hospital: hospital })
          }
        >
          <Text style={styles.bookBtnText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  hospitalBox: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.white,
  },
  pageHeader: {
    position: "absolute",
    top: 0,
    zIndex: 3,
    left: 0,
    right: 0,
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  infoBox: {
    flexDirection: "column",
    gap: 15,
  },
  hospitalImg: {
    width: "100%",
    height: 190,
  },
  detailedBox: {
    marginTop: -20,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  bookBtn: {
    padding: 10,
    backgroundColor: Colors.celestial,
    marginBottom: 10,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
  bookBtnText: {
    fontFamily: "appfontSemibold",
    fontSize: 14,
    color: Colors.white,
  },
});
