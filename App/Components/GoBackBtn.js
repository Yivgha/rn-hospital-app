import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../assets/Shared/Colors";

export function GoBackBtn() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.goBackBtn}
    >
      <AntDesign name="arrowleft" size={24} color={Colors.white} />
      <Text style={styles.goBackBtnText}>Go back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  goBackBtn: {
    paddingVertical: 5,
    paddingLeft: 5,
    paddingRight: 10,
    height: 40,
    width: 110,
    backgroundColor: Colors.black,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
  goBackBtnText: {
    fontFamily: "appfontLight",
    fontSize: 16,
    color: Colors.white,
  },
});
