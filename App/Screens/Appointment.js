import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
  Pressable,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Colors from "../../assets/Shared/Colors";
import { PageHeader } from "../Components/PageHeader";
import { useUser } from "@clerk/clerk-expo";
import GlobalApi from "../Services/GlobalApi";
import AppointmentItem from "../Components/AppointmentScreen/AppointmentItem";
import { DeleteAppointmentModal } from "../Components/DeleteAppointmentModal";

export function Appointment() {
  const { user } = useUser();

  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [appointmentID, setAppointmentId] = useState();

  const getUserAppointments = () => {
    const userEmail = user.primaryEmailAddress.emailAddress;
    GlobalApi.getUserAppointments(userEmail).then((res) =>
      setSelectedAppointments(res.data.data)
    );
  };

  useEffect(() => {
    getUserAppointments();
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    getUserAppointments();
  }, [appointmentID, selectedAppointments.length]);

  return (
    <View style={styles.homeBox}>
      <ScrollView horizontal={false}>
        <View style={styles.innerBox}>
          <PageHeader title={"Appointments"} style={{ color: Colors.white }} />

          <FlatList
            horizontal={false}
            scrollEnabled={false}
            data={selectedAppointments}
            extraData={selectedAppointments}
            contentContainerStyle={{ gap: 15 }}
            renderItem={({ item, index }) => (
              <AppointmentItem
                key={index}
                appointment={item}
                setAppointmentId={setAppointmentId}
                toggleModal={toggleModal}
              />
            )}
          />
          {selectedAppointments.length === 0 && (
            <Text style={styles.noInfoText}>
              You don't have any appointments yet
            </Text>
          )}
          <DeleteAppointmentModal
            appointmentID={appointmentID}
            toggleModal={toggleModal}
            modalVisible={modalVisible}
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
    position: "relative",
  },
  innerBox: {
    gap: 15,
  },
  noInfoText: {
    fontFamily: "appfont",
    fontSize: 18,
    color: Colors.white,
    alignSelf: "center",
    marginTop: 150,
  },
});
