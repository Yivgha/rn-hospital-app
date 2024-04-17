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
import { AntDesign } from "@expo/vector-icons";

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
  }, [selectedAppointments.length]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleDeleteAppointment = (itemId) => {
    GlobalApi.deleteAppointment(itemId)
      .then((res) => console.log("deleted"))
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.homeBox}>
      <ScrollView vertical={true} horizontal={false}>
        <View style={styles.innerBox}>
          <PageHeader title={"Appointments"} style={{ color: Colors.white }} />
          <FlatList
            horizontal={false}
            scrollEnabled={false}
            data={selectedAppointments}
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
          <View onTouchEnd={toggleModal}>
            <Modal
              style={styles.modalBox}
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                toggleModal();
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    onPress={toggleModal}
                    style={styles.cancelBtn}
                  >
                    <AntDesign name="close" size={20} color={Colors.gray} />
                  </TouchableOpacity>
                  <Text style={styles.modalText}>
                    Do you want to cancel this appointment?
                  </Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      handleDeleteAppointment(appointmentID);
                      toggleModal();
                    }}
                  >
                    <Text style={styles.textStyle}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
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
    gap: 10,
  },
  modalBox: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 300,
  },
  centeredView: {
    padding: 100,
    alignItems: "center",
  },
  cancelBtn: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  modalView: {
    backgroundColor: Colors.white,
    position: "relative",
    width: Dimensions.get("screen").width * 0.9,
    borderRadius: 20,
    paddingTop: 35,
    paddingBottom: 25,
    paddingHorizontal: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "appfont",
    color: Colors.black,
    fontSize: 18,
  },
  textStyle: {
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "appfont",
    fontSize: 18,
    textTransform: "uppercase",
  },
  buttonClose: {
    backgroundColor: Colors.error,
    borderRadius: 20,
    padding: 15,
  },
});
