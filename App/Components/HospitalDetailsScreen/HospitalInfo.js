import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import Colors from "../../../assets/Shared/Colors";
import { AntDesign } from "@expo/vector-icons";
import { ActionButton } from "./ActionButton";

export function HospitalInfo({ hospital }) {
  const { Address, Description, Email, Name, Phone, categories, Website } =
    hospital;
  return (
    hospital && (
      <ScrollView style={{ flex: 1 }} vertical>
        <View style={styles.box}>
          <View style={styles.addressBox}>
            <AntDesign name="enviroment" size={21} color={Colors.celestial} />
            <Text style={styles.hospitalAddress}>{Address}</Text>
          </View>
          <View style={styles.addressBox}>
            <AntDesign name="clockcircle" size={20} color={Colors.celestial} />
            <Text style={styles.hospitalAddress}>Mon-Sun, 10:00-18:00</Text>
          </View>

          <View
            style={{
              backgroundColor: Colors.lightGray,
              height: 1,
            }}
          ></View>

          <View>
            <Text style={styles.title}>Specializations</Text>
            <FlatList
              data={categories?.data}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <Text key={index} style={styles.categoriesText}>
                  {item.attributes.Name}
                </Text>
              )}
            />
          </View>

          <View
            style={{
              backgroundColor: Colors.lightGray,
              height: 1,
            }}
          ></View>

          <ActionButton />

          <View>
            <Text style={styles.title}>About</Text>
            <Text style={styles.description}>{Description}</Text>
          </View>
        </View>
      </ScrollView>
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
  },
  hospitalAddress: {
    fontFamily: "appfontLight",
    fontStyle: "italic",
    fontSize: 19,
    color: Colors.gray,
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
