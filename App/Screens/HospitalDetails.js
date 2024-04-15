import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import Colors from "../../assets/Shared/Colors";
import { useRoute } from "@react-navigation/native";
import { NothingFound } from "../Components/NothingFound";
import { PageHeader } from "../Components/PageHeader";
import { HospitalInfo } from "../Components/HospitalDetailsScreen/HospitalInfo";

export function HospitalDetails() {
  const [hospital, setHospital] = useState({});

  const param = useRoute();
  useEffect(() => {
    setHospital(param.params.hospitalDetails.attributes);
  }, []);

  if (!hospital) {
    return <NothingFound />;
  }

  return (
    hospital && (
      <ScrollView style={styles.hospitalBox} horizontal={false}>
        <View style={styles.infoBox}>
          <PageHeader
            title={hospital.Name}
            style={{ position: "absolute", top: 0, zIndex: 3 }}
          />
          <Image
            source={{ uri: hospital?.Image?.data.attributes.url }}
            style={styles.hospitalImg}
          />
          <View style={styles.detailedBox}>
            <HospitalInfo hospital={hospital} />
          </View>
        </View>
      </ScrollView>
    )
  );
}

const styles = StyleSheet.create({
  hospitalBox: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.sky,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  infoBox: {
    flexDirection: "column",
    gap: 15,
    marginTop: 10,
  },
  hospitalImg: {
    width: "100%",
    height: 190,
    borderRadius: 10,
  },
  detailedBox: {
    marginTop: -40,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
});
