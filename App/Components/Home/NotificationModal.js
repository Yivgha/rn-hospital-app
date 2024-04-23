import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../../assets/Shared/Colors";
import moment from "moment";
import GlobalApi from "../../Services/GlobalApi";

export function NotificationModal({
  toggleNotificationModal,
  isModalOpen,
  userNotifications,
}) {
  const formattedDate = (inputDate) =>
    moment(inputDate).local("uk-UA").format("HH:mm DD MMM");

  const deleteAllNotifications = () => {
    userNotifications.map((el) =>
      GlobalApi.deleteNotificationByUserEmail(el.id)
        .then((res) => console.log("deleted notification", el.id))
        .catch((err) => console.log(err))
    );
  };

  return (
    <Modal
      style={styles.modalBox}
      animationType="slide"
      transparent={true}
      visible={isModalOpen}
      onRequestClose={() => {
        toggleNotificationModal();
        deleteAllNotifications();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => {
              toggleNotificationModal();
              deleteAllNotifications();
            }}
            style={styles.cancelBtn}
          >
            <AntDesign name="close" size={20} color={Colors.gray} />
          </TouchableOpacity>
          <Text style={styles.modalText}>
            {!userNotifications.length
              ? "You don't have notifications yet"
              : "Your last notifications"}
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ maxHeight: 400 }}
          >
            {userNotifications.map((el, index) => (
              <View key={index} style={styles.notificationBox}>
                <View style={styles.notificationText}>
                  <Text style={styles.textStyle}>
                    {formattedDate(el.attributes.createdAt)}
                  </Text>
                  <Text style={styles.textStyle}>
                    {el.attributes.NotificationText}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalBox: {
    position: "absolute",
    top: 0,
    left: 0,
    minHeight: 500,
    overflowY: "scroll",
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
    color: Colors.celestial,
    fontFamily: "appfont",
    fontSize: 16,
  },
  buttonClose: {
    backgroundColor: Colors.error,
    borderRadius: 20,
    padding: 15,
  },
  notificationBox: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationText: {
    flexDirection: "column",
    padding: 3,
    gap: 3,
    flex: 1,
  },
});
