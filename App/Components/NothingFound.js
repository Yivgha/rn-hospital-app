import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { GoBackBtn } from "./GoBackBtn";
import Colors from "../../assets/Shared/Colors";
import NothingIcon from "../../assets/icons/nothing.png";

export function NothingFound({ buttonBack = true }) {
  return (
    <View style={styles.nothingBox}>
      {buttonBack && <GoBackBtn />}

      <View style={styles.iconBox}>
        <Image source={NothingIcon} style={styles.nothingIcon} />
        <Text style={styles.nothingText}>Nothing Found</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nothingBox: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 100,
    backgroundColor: Colors.lightGray,
    paddingTop: 19,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  iconBox: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: Dimensions.get("screen").width * 0.9,
  },
  nothingIcon: {
    height: 150,
    width: 150,
  },
  nothingText: {
    fontFamily: "appfontSemibold",
    fontSize: 30,
    color: Colors.celestial,
  },
});
