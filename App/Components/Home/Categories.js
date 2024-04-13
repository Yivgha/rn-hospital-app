import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Colors from "../../../assets/Shared/Colors";
import GlobalApi from "../../Services/GlobalApi";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    GlobalApi.getCategories().then((res) => setCategories(res.data.data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (!categories) {
    return null;
  }

  return (
    <View style={styles.categoriesBox}>
      <View style={styles.captionBox}>
        <Text style={styles.captionText}>Doctor's Speciality</Text>
        <Text style={styles.textColor}>See All</Text>
      </View>
      <FlatList
        data={categories}
        numColumns={4}
        columnWrapperStyle={styles.columnWrapperStyle}
        renderItem={({ item, index }) =>
          index < 4 && (
            <View key={index} style={styles.flatListWrapper}>
              <View style={styles.innerWrapper}>
                <Image
                  source={{ uri: item?.attributes.Icon.data.attributes.url }}
                  style={{ height: 30, width: 30 }}
                />
              </View>
              <Text style={styles.categoryText}>{item?.attributes.Name}</Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoriesBox: {
    flexDirection: "column",
    gap: 7,
  },
  captionBox: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  captionText: {
    fontFamily: "appfontSemibold",
    color: Colors.white,
    fontSize: 18,
  },
  textColor: {
    fontFamily: "appfontLight",
    color: Colors.white,
    fontSize: 18,
  },
  categoryText: {
    fontFamily: "appfont",
    color: Colors.peach,
    fontSize: 14,
  },
  columnWrapperStyle: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  flatListWrapper: {
    alignItems: "center",
  },
  innerWrapper: {
    backgroundColor: Colors.white,
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    minWidth: 70,
  },
});
