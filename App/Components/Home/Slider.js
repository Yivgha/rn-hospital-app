import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import GlobalApi from "../../Services/GlobalApi";
import { SubHeading } from "./SubHeading";

const ITEM_WIDTH = Dimensions.get("screen").width * 0.9;

export function Slider() {
  const [sliderData, setSliderData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideAnim = new Animated.Value(-currentIndex * ITEM_WIDTH);

  useEffect(() => {
    fetchSlider();
  }, []);

  const fetchSlider = () => {
    GlobalApi.getSlider().then((res) => setSliderData(res.data.data));
  };

  if (!sliderData) {
    return null;
  }
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const slideAnimation = () => {
    Animated.timing(slideAnim, {
      toValue: -currentIndex * ITEM_WIDTH,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    slideAnimation();
  }, [currentIndex]);

  return (
    <View style={styles.sliderBox}>
      <SubHeading subHeading={"See what's new"} />
      <Animated.View
        style={[
          styles.slideWrapper,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        {sliderData.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image?.attributes.Image.data.attributes.url }}
            style={styles.sliderImg}
            resizeMode="cover"
          />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderBox: {
    flexDirection: "column",
    gap: 7,
    overflow: "hidden",
    width: ITEM_WIDTH,
    height: 210,
    borderRadius: 10,
  },
  slideWrapper: {
    flexDirection: "row",
    width: ITEM_WIDTH,
  },
  sliderImg: {
    height: 210,
    width: ITEM_WIDTH,
    borderRadius: 10,
  },
});
