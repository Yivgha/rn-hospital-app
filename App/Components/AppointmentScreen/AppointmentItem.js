import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Colors from "../../../assets/Shared/Colors";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";

export default function AppointmentItem({ appointment }) {
  const isHospital = appointment.attributes.hospitals?.data.length > 0;
  const isDoctor = appointment.attributes.doctors?.data.length > 0;

  return (
    <TouchableOpacity
      onPress={() => {
        console.log("pressed", appointment.id);
      }}
    >
      <View style={styles.appointmentItemBox}>
        <View style={styles.infoBlock}>
          <View style={{ flexDirection: "column", width: "50%", gap: 10 }}>
            <Text style={styles.appointmentTitle}>
              {isHospital > 0 &&
                appointment.attributes.hospitals?.data[0].attributes.Name}
              {isDoctor &&
                appointment.attributes.doctors?.data[0].attributes.Name}
            </Text>
            <View style={styles.dateBlock}>
              <Text style={[styles.textColor, { fontSize: 18 }]}>
                {moment
                  .parseZone(appointment.attributes.Date)
                  .local(true)
                  .format("MMMM Do YYYY")}
              </Text>
              <Text style={[styles.textColor]}>
                {appointment.attributes.Time}
              </Text>
            </View>
            <View style={styles.addressBox}>
              <AntDesign name="enviroment" size={17} color={Colors.celestial} />
              <Text style={styles.hospitalAddress} textBreakStrategy="simple">
                {isHospital &&
                  appointment.attributes.hospitals?.data[0].attributes.Address}
                {isDoctor &&
                  appointment.attributes.doctors?.data[0].attributes.Address}
              </Text>
            </View>
            <View style={styles.addressBox}>
              <AntDesign
                name="infocirlceo"
                size={17}
                color={Colors.celestial}
              />
              <Text style={styles.hospitalAddress} textBreakStrategy="simple">
                Booking ID: #{appointment?.id}
              </Text>
            </View>
          </View>
          <View style={styles.imageBlock}>
            {isHospital && (
              <Image
                style={styles.hospitalImage}
                source={{
                  uri: appointment?.attributes?.hospitals?.data[0]?.attributes
                    ?.Image.data.attributes.url,
                }}
              />
            )}
            {isDoctor && (
              <Image
                style={styles.hospitalImage}
                source={{
                  uri: appointment?.attributes?.doctors?.data[0]?.attributes
                    ?.Image.data.attributes.url,
                }}
              />
            )}
          </View>
        </View>
        <Text style={[styles.textColor, styles.noteColor]}>
          {appointment.attributes.Note.length > 0 &&
            appointment.attributes.Note}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appointmentItemBox: {
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.sky,
    borderRadius: 10,
    gap: 15,
  },
  appointmentTitle: {
    fontFamily: "appfontSemibold",
    fontSize: 24,
    color: Colors.celestial,
  },
  infoBlock: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    gap: 19,
  },
  dateBlock: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  imageBlock: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textColor: {
    fontSize: 16,
    color: Colors.gray,
    fontFamily: "appfont",
  },
  noteColor: {
    fontStyle: "italic",
    alignSelf: "flex-start",
    left: 10,
  },
  hospitalImage: {
    width: 130,
    height: 150,
    borderRadius: 30,
  },
  addressBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
  },
  hospitalAddress: {
    fontFamily: "appfontLight",
    fontStyle: "italic",
    fontSize: 14,
    color: Colors.gray,
  },
});
