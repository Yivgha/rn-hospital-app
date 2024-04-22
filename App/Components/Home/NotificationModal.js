import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../../assets/Shared/Colors";
import moment from "moment";
import GlobalApi from "../../Services/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";

export function NotificationModal({
  toggleNotificationModal,
  isModalOpen,
  userNotifications,
}) {
  const { user } = useUser();
  const navigation = useNavigation();

  const formattedDate = (inputDate) => moment(inputDate).format("HH:mm DD MMM");

  const deleteNotification = (id) => {
    GlobalApi.deleteNotificationByUserEmail(id)
      .then((res) => {
        console.log("deleted notification with id", id);
        toggleNotificationModal();
        navigation.navigate("Home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      style={styles.modalBox}
      animationType="slide"
      transparent={true}
      visible={isModalOpen}
      onRequestClose={() => {
        toggleNotificationModal();
        console.log("close modal");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={toggleNotificationModal}
            style={styles.cancelBtn}
          >
            <AntDesign name="close" size={20} color={Colors.gray} />
          </TouchableOpacity>
          <Text style={styles.modalText}>
            {!userNotifications.length
              ? "You don't have notifications yet"
              : "Your last notifications"}
          </Text>
          {userNotifications.map((el, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  padding: 3,
                  gap: 3,
                  flex: 1,
                }}
              >
                <Text style={styles.textStyle}>
                  {formattedDate(el.attributes.createdAt)}
                </Text>
                <Text style={styles.textStyle}>
                  {el.attributes.NotificationText}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  console.log("pressed delete");
                  if (user) {
                    deleteNotification(el.id);
                  }
                }}
              >
                <AntDesign name="delete" size={24} color={Colors.gray} />
              </TouchableOpacity>
            </View>
          ))}
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
});
