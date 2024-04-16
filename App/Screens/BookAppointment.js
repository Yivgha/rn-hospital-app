import { useRoute } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import Colors from "../../assets/Shared/Colors";
import { PageHeader } from "../Components/PageHeader";
import { AppointmentHospitalInfo } from "../Components/BookAppointment/AppointmentHospitalInfo";
import { HorizontalBreakLine } from "../Components/HorizontalBreakLine";
import { ActionButton } from "../Components/HospitalDetailsScreen/ActionButton";
import { BookingSection } from "../Components/BookAppointment/BookingSection";

export function BookAppointment() {
  const param = useRoute().params;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView horizontal={false} vertical={true}>
        <View style={styles.pageBox}>
          <PageHeader title={"Book Appointment"} />
          <AppointmentHospitalInfo
            bookHospital={param.hospital}
            doctor={param.doctor}
          />
          <HorizontalBreakLine />
          <ActionButton />
          <HorizontalBreakLine />
          <BookingSection hospital={param.hospital} doctor={param.doctor} />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  pageBox: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.sky,
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 15,
  },
});
