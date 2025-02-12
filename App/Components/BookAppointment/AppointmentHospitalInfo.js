import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../../assets/Shared/Colors";
import { NothingFound } from "../NothingFound";

export function AppointmentHospitalInfo({ bookHospital, doctor }) {
  if (!bookHospital && !doctor) {
    return <NothingFound />;
  }

  return (
    <View style={styles.box}>
      {!!bookHospital && (
        <View style={styles.topInfo}>
          <Image
            source={{
              uri: bookHospital?.attributes?.Image?.data?.attributes?.url,
            }}
            style={styles.hospitalImage}
          />
          <View style={styles.infoBox}>
            <Text style={styles.textColor}>
              {bookHospital?.attributes?.Name}
            </Text>

            <View style={styles.addressBox}>
              <AntDesign name="enviroment" size={15} color={Colors.celestial} />
              <Text
                style={styles.hospitalAddress}
                textBreakStrategy="highQuality"
              >
                {bookHospital?.attributes?.Address}
              </Text>
            </View>
            <View style={styles.addressBox}>
              <AntDesign
                name="clockcircle"
                size={15}
                color={Colors.celestial}
              />
              <Text style={styles.hospitalAddress}>
                Mon-Sun, {bookHospital?.attributes?.Start_Time.slice(0, 5)} -{" "}
                {bookHospital?.attributes?.End_Time.slice(0, 5)}
              </Text>
            </View>
          </View>
        </View>
      )}
      {!!doctor && (
        <View style={styles.topInfo}>
          <Image
            source={{
              uri: doctor?.attributes?.Image?.data?.attributes?.url,
            }}
            style={styles.hospitalImage}
          />
          <View style={styles.infoBox}>
            <Text style={styles.textColor}>{doctor?.attributes?.Name}</Text>
            <View style={styles.addressBox}>
              <AntDesign name="enviroment" size={15} color={Colors.celestial} />
              <Text
                style={styles.hospitalAddress}
                textBreakStrategy="highQuality"
              >
                {doctor?.attributes?.Address}
              </Text>
            </View>
            <View style={styles.addressBox}>
              <AntDesign
                name="clockcircle"
                size={15}
                color={Colors.celestial}
              />
              <Text style={styles.hospitalAddress}>
                Mon-Sun, {doctor?.attributes?.Start_Time.slice(0, 5)} -{" "}
                {doctor?.attributes?.End_Time.slice(0, 5)}
              </Text>
            </View>
          </View>
        </View>
      )}
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
    gap: 10,
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
