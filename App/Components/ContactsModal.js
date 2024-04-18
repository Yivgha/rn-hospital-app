import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  Dimensions,
  Linking,
  Platform,
  Share,
} from "react-native";
import Colors from "../../assets/Shared/Colors";
import { AntDesign } from "@expo/vector-icons";

export function ContactsModal({
  toggleModal,
  modalVisible,
  actionContentType,
  doctorInfo,
  hospitalInfo,
}) {
  const IP_ADDRESS = process.env.EXPO_PUBLIC_IP_ADDRESS;

  let actionInfo = "Default";
  let actionText = "Default";

  const dialCall = (number) => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const sendEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const openSite = (url) => {
    Linking.openURL(`https://${url}/`);
  };

  const showOnMap = (url) => {
    const encodedAddress = encodeURIComponent(url);
    const encodedUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    Linking.openURL(encodedUrl);
  };

  const shareInfo = (id) => {
    let shareUrl;

    if (doctorInfo) {
      shareUrl = `http://${IP_ADDRESS}/api/doctors/${id}`;
    }
    if (hospitalInfo) {
      shareUrl = `http://${IP_ADDRESS}/api/hospitals/${id}`;
    }

    const message = "Check out this info: " + shareUrl;

    Share.share({
      message: message,
    });
  };

  if (doctorInfo) {
    switch (actionContentType) {
      case "Phone":
        actionInfo = doctorInfo?.attributes?.Phone;
        actionText = "Call";
        break;
      case "Email":
        actionInfo = doctorInfo?.attributes?.Email;
        actionText = "Send";
        break;
      case "Website":
        actionInfo = doctorInfo?.attributes?.Website;
        actionText = "Open";
        break;
      case "Location":
        actionInfo = doctorInfo?.attributes?.Address;
        actionText = "Show on map";
        break;
      case "Share":
        actionInfo = `${doctorInfo?.attributes?.Name} page`;
        actionText = "Share";
        break;
      default:
        return null;
    }
  }
  if (hospitalInfo) {
    switch (actionContentType) {
      case "Phone":
        actionInfo = hospitalInfo?.attributes?.Phone;
        actionText = "Call";
        break;
      case "Email":
        actionInfo = hospitalInfo?.attributes?.Email;
        actionText = "Send";
        break;
      case "Website":
        actionInfo = hospitalInfo?.attributes?.Website;
        actionText = "Open";
        break;
      case "Location":
        actionInfo = hospitalInfo?.attributes?.Address;
        actionText = "Show on map";
        break;
      case "Share":
        actionInfo = `${hospitalInfo?.attributes?.Name} page`;
        actionText = "Share";
        break;
      default:
        return null;
    }
  }

  return (
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
            <TouchableOpacity onPress={toggleModal} style={styles.cancelBtn}>
              <AntDesign name="close" size={20} color={Colors.gray} />
            </TouchableOpacity>
            <Text style={styles.modalText}>
              {actionContentType}: {actionInfo}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                toggleModal();
                if (actionContentType === "Phone") {
                  dialCall(actionInfo);
                } else if (actionContentType === "Email") {
                  sendEmail(actionInfo);
                } else if (actionContentType === "Website") {
                  openSite(actionInfo);
                } else if (actionContentType === "Location") {
                  showOnMap(actionInfo);
                } else if (actionContentType === "Share") {
                  if (doctorInfo) {
                    const doctorId = doctorInfo?.id;
                    shareInfo(doctorId);
                  } else if (hospitalInfo) {
                    const hospitalId = hospitalInfo?.id;
                    shareInfo(hospitalId);
                  }
                }
              }}
            >
              <Text style={styles.textStyle}>{actionText}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
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
