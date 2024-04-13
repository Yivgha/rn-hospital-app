import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import Colors from "../../../assets/Shared/Colors";
import GlobalApi from "../../Services/GlobalApi";

export function Slider() {
  const [sliderData, setSliderData] = useState([]);
  useEffect(() => {
    fetchSlider();
  }, []);
  const fetchSlider = () => {
    GlobalApi.getSlider().then((res) => setSliderData(res.data.data));
  };

  if (!sliderData) {
    return null;
  }

  return (
    <View style={styles.sliderBox}>
      <Text style={styles.textColor}>
        Slide to the right to see our employees
      </Text>
      <FlatList
        data={sliderData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item?.attributes.Image.data.attributes.url }}
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
    gap: 7,
  },
  textColor: {
    fontFamily: "appfont",
    color: Colors.peach,
    fontSize: 18,
  },
  sliderImg: {
    height: 170,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 10,
    marginRight: 3,
  },
});
