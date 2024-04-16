import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../../assets/Shared/Colors";
import { NothingFound } from "../NothingFound";

export function AppointmentHospitalInfo({ bookHospital }) {
  if (!bookHospital) {
    return <NothingFound />;
  }

  return (
    <View style={styles.box}>
      <View style={styles.topInfo}>
        <Image
          source={{
            uri: bookHospital?.attributes?.Image?.data?.attributes?.url,
          }}
          style={styles.hospitalImage}
        />
        <View style={styles.infoBox}>
          <Text style={styles.textColor}>{bookHospital?.attributes?.Name}</Text>
          <View style={styles.addressBox}>
            <AntDesign name="enviroment" size={15} color={Colors.celestial} />
            <Text
              style={styles.hospitalAddress}
              textBreakStrategy="highQuality"
            >
              {bookHospital?.attributes?.Address}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "column",
    gap: 15,
    paddingHorizontal: 10,
  },
  topInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 30,
  },
  hospitalImage: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  infoBox: {
    flexWrap: "wrap",
    flexDirection: "column",
  },
  textColor: {
    fontFamily: "appfontBold",
    fontSize: 20,
    color: Colors.celestial,
  },
  addressBox: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 5,
  },
  hospitalAddress: {
    fontFamily: "appfontLight",
    fontStyle: "italic",
    fontSize: 14,
    color: Colors.gray,
    width: "75%",
  },
});
