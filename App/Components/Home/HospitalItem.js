import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import Colors from "../../../assets/Shared/Colors";
import { CustomHospitalInfoBlock } from "./CustomHospitalInfoBlock";

export function HospitalItem({ hospital }) {
  return (
    <View style={styles.hospital}>
      <Image
        source={{ uri: hospital?.attributes.Image.data.attributes.url }}
        style={styles.hospitalImage}
      />
      <Text style={styles.hospitalCaption}>{hospital?.attributes.Name}</Text>
      <CustomHospitalInfoBlock text={hospital?.attributes.Address} />
    </View>
  );
}

const styles = StyleSheet.create({
  hospital: {
    flexDirection: "column",
    gap: 5,
    alignItems: "baseline",
    justifyContent: "flex-start",
    width: Dimensions.get("screen").width * 0.7,
    marginRight: 5,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    borderRadius: 10,
  },
  hospitalImage: {
    width: "100%",
    minHeight: 170,
    borderRadius: 10,
  },
  hospitalCaption: {
    fontFamily: "appfontBold",
    fontSize: 18,
    color: Colors.peach,
    alignSelf: "center",
  },
  infoWrapper: { flexDirection: "row", gap: 5 },
  infoTitle: {
    fontFamily: "appfontSemibold",
    fontSize: 14,
    color: Colors.peach,
  },
  hospitalText: {
    fontFamily: "appfont",
    fontSize: 14,
    color: Colors.celestial,
  },
});
