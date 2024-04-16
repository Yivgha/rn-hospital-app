import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Colors from "../../../assets/Shared/Colors";

export function HospitalDoctorTab({ activeTab }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.tabBox}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            activeIndex === 0 ? styles.activeTab : styles.inactiveTab,
            styles.buttonStyle,
          ]}
          onPress={() => {
            setActiveIndex(0);
            activeTab("Doctors");
          }}
        >
          <Text
            style={[
              activeIndex === 0 ? styles.activeText : styles.inactiveText,
            ]}
          >
            Doctors
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            activeIndex === 1 ? styles.activeTab : styles.inactiveTab,
            styles.buttonStyle,
          ]}
          onPress={() => {
            setActiveIndex(1);
            activeTab("Hospitals");
          }}
        >
          <Text
            style={[
              activeIndex === 1 ? styles.activeText : styles.inactiveText,
            ]}
          >
            Hospitals
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBox: {
    flexDirection: "column",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("screen").width * 0.9,
  },
  buttonStyle: {
    paddingVertical: 5,
    paddingHorizontal: "auto",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: Dimensions.get("screen").width * 0.44,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.celestial,
  },
  inactiveTab: { borderBottomWidth: 1, borderBottomColor: Colors.gray },
  activeText: {
    fontFamily: "appfontSemibold",
    fontSize: 18,
    color: Colors.celestial,
  },
  inactiveText: {
    fontFamily: "appfontSemibold",
    fontSize: 18,
    color: Colors.gray,
  },
});
