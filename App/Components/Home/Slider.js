import { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import GlobalApi from "../../Services/GlobalApi";
import { SubHeading } from "./SubHeading";

const ITEM_WIDTH = Dimensions.get("screen").width * 0.8;

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
      <SubHeading subHeading={"Slide to the right to see more"} />
      <FlatList
        data={sliderData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item?.attributes.Image.data.attributes.url }}
            alt={item.name}
            style={styles.sliderImg}
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
  sliderImg: {
    height: 170,
    width: ITEM_WIDTH,
    borderRadius: 10,
  },
});
