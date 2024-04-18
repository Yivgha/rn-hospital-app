import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import Colors from "../../assets/Shared/Colors";
import { AntDesign } from "@expo/vector-icons";

export function HospitalCardItem({ hospitalInfo }) {
  const { Address, Name, categories, Views } = hospitalInfo.attributes;

  return (
    <View style={styles.hospitalCardBox}>
      <Image
        source={{ uri: hospitalInfo.attributes.Image.data.attributes.url }}
        style={styles.hospitalImg}
      />
      <View style={styles.innerBox}>
        <Text style={styles.hospitalTitle}>{Name}</Text>
        <View style={styles.addressBox}>
          <AntDesign name="enviroment" size={21} color={Colors.celestial} />
          <Text style={styles.hospitalAddress}>{Address}</Text>
        </View>
        {/* <View style={styles.addressBox}>
          <AntDesign name="eye" size={21} color={Colors.celestial} />
          <Text style={styles.hospitalAddress}>{Views}</Text>
        </View> */}

        <FlatList
          data={categories.data}
          horizontal={false}
          scrollEnabled={false}
          numColumns={3}
          contentContainerStyle={{ flexDirection: "row" }}
          renderItem={({ item, index }) => (
            <Text key={index} style={styles.categoriesText}>
              {item.attributes.Name}
            </Text>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hospitalCardBox: {
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    gap: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.white,
    paddingBottom: 10,
  },
  hospitalImg: {
    height: 170,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  hospitalTitle: {
    fontFamily: "appfontBold",
    fontSize: 18,
    color: Colors.celestial,
  },
  addressBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
  },
  hospitalAddress: {
    fontFamily: "appfontLight",
    fontStyle: "italic",
    fontSize: 16,
    color: Colors.gray,
  },
  categoriesText: {
    fontFamily: "appfontLight",
    fontSize: 14,
    color: Colors.gray,
    marginRight: 10,
  },
  innerBox: {
    paddingHorizontal: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    gap: 5,
  },
});
