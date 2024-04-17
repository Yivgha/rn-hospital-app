import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Colors from "../../../assets/Shared/Colors";
import { CustomHospitalInfoBlock } from "./CustomHospitalInfoBlock";
import { useNavigation } from "@react-navigation/native";

export function HospitalItem({ hospital }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("HospitalDetails", { hospitalDetails: hospital });
      }}
    >
      <View style={styles.hospital}>
        <Image
          source={{ uri: hospital?.attributes.Image.data.attributes.url }}
          style={styles.hospitalImage}
        />
        <Text style={styles.hospitalCaption}>{hospital?.attributes.Name}</Text>
        <CustomHospitalInfoBlock
          text={hospital?.attributes.Address}
          icon={true}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  hospital: {
    flexDirection: "column",
    gap: 1,
    alignItems: "baseline",
    justifyContent: "flex-start",
    width: Dimensions.get("screen").width * 0.7,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingBottom: 10,
    flexGrow: 1,
    flex: 1,
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
