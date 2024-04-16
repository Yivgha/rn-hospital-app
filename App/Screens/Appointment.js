import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import Colors from "../../assets/Shared/Colors";
import { PageHeader } from "../Components/PageHeader";
import { useUser } from "@clerk/clerk-expo";
import GlobalApi from "../Services/GlobalApi";
import AppointmentItem from "../Components/AppointmentScreen/AppointmentItem";

export function Appointment() {
  const { user } = useUser();

  const [selectedAppointments, setSelectedAppointments] = useState([]);

  const getUserAppointments = () => {
    const userEmail = user.primaryEmailAddress.emailAddress;
    GlobalApi.getUserAppointments(userEmail).then((res) =>
      setSelectedAppointments(res.data.data)
    );
  };

  useEffect(() => {
    getUserAppointments();
  }, []);

  return (
    <View style={styles.homeBox}>
      <ScrollView vertical={true} horizontal={false}>
        <View style={styles.innerBox}>
          <PageHeader title={"Appointments"} style={{ color: Colors.white }} />
          <FlatList
            data={selectedAppointments}
            contentContainerStyle={{ gap: 15 }}
            renderItem={({ item, index }) => (
              <AppointmentItem key={index} appointment={item} />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  homeBox: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.celestial,
  },
  innerBox: {
    gap: 10,
  },
});
