import { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Colors from "../../../assets/Shared/Colors";
import { AntDesign } from "@expo/vector-icons";
import { ActionButton } from "./ActionButton";
import { HorizontalBreakLine } from "../HorizontalBreakLine";
import { ContactsModal } from "../ContactsModal";

export function HospitalInfo({ hospital }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [actionContentType, setActionContentType] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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
          <Text style={styles.hospitalAddress}>
            Mon-Sun, {hospital?.attributes?.Start_Time.slice(0, 5)} -{" "}
            {hospital?.attributes?.End_Time.slice(0, 5)}
          </Text>
        </View>

        <HorizontalBreakLine />

        <View>
          <Text style={styles.title}>Specializations</Text>
          <FlatList
            data={hospital?.attributes?.categories?.data}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Text key={index} style={styles.categoriesText}>
                {item.attributes.Name}
              </Text>
            )}
          />
        </View>

        <HorizontalBreakLine />

        <ActionButton
          toggleModal={toggleModal}
          setActionContentType={setActionContentType}
        />

        <HorizontalBreakLine />

        <View>
          <Text style={styles.title}>About</Text>
          <Text style={styles.description}>
            {hospital?.attributes?.Description?.length > 0
              ? hospital?.attributes?.Description
              : "No info provided"}
          </Text>
        </View>
        <ContactsModal
          toggleModal={toggleModal}
          modalVisible={isModalVisible}
          actionContentType={actionContentType}
          hospitalInfo={hospital}
        />
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
