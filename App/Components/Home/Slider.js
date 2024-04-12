import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import Colors from "../../../assets/Shared/Colors";

const sliderData = [
  {
    id: 1,
    name: "Doctor 2",
    imageUrl:
      "https://cdn.pixabay.com/photo/2021/02/15/16/01/woman-6018388_1280.jpg",
  },
  {
    id: 2,
    name: "Doctor 1",
    imageUrl:
      "https://cdn.pixabay.com/photo/2020/11/02/19/52/doctor-5707722_1280.jpg",
  },
];

export function Slider() {
  return (
    <View style={styles.sliderBox}>
      <Text style={styles.textColor}>Slider</Text>
      <FlatList
        data={sliderData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item?.imageUrl }}
            alt={item.name}
            style={styles.sliderImg}
            key={index}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderBox: {
    flexDirection: "column",
  },
  textColor: {
    fontFamily: "appfont",
    color: Colors.white,
    fontSize: 16,
  },
  sliderImg: {
    height: 170,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 10,
    marginRight: 3,
  },
});
