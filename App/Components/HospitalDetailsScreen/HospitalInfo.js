import { View, Text, StyleSheet, FlatList } from "react-native";
import Colors from "../../../assets/Shared/Colors";
import { AntDesign } from "@expo/vector-icons";
import { ActionButton } from "./ActionButton";
import { HorizontalBreakLine } from "../HorizontalBreakLine";

export function HospitalInfo({ hospital }) {
  return (
    hospital && (
      <View style={styles.box}>
        <View style={styles.addressBox}>
          <AntDesign name="enviroment" size={21} color={Colors.celestial} />
          <Text style={styles.hospitalAddress} textBreakStrategy="simple">
            {hospital?.attributes?.Address}
          </Text>
        </View>
        <View style={styles.addressBox}>
          <AntDesign name="clockcircle" size={20} color={Colors.celestial} />
          <Text style={styles.hospitalAddress}>Mon-Sun, 10:00-18:00</Text>
        </View>

        <HorizontalBreakLine />

        <View>
          <Text style={styles.title}>Specializations</Text>
          <FlatList
            data={hospital?.attributes?.categories?.data}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            renderItem={({ item, index }) => (
              <Text key={index} style={styles.categoriesText}>
                {item.attributes.Name}
              </Text>
            )}
          />
        </View>

        <HorizontalBreakLine />

        <ActionButton />

        <HorizontalBreakLine />

        <View>
          <Text style={styles.title}>About</Text>
          <Text style={styles.description}>
            {hospital?.attributes?.Description?.length > 0
              ? hospital?.attributes?.Description
              : "No info provided"}
          </Text>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "column",
    paddingHorizontal: 10,
    gap: 15,
    paddingVertical: 15,
  },
  categoriesText: {
    fontFamily: "appfont",
    fontSize: 16,
    color: Colors.gray,
    marginRight: 10,
  },
  addressBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
    paddingHorizontal: 10,
  },
  hospitalAddress: {
    fontFamily: "appfontLight",
    fontStyle: "italic",
    fontSize: 19,
    color: Colors.gray,
    paddingRight: 10,
  },
  title: {
    fontFamily: "appfontBold",
    fontSize: 18,
    color: Colors.gray,
    marginBottom: 10,
  },
  description: {
    fontFamily: "appfontLight",
    fontSize: 16,
    color: Colors.celestial,
  },
});
