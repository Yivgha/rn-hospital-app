import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import GlobalApi from "../../Services/GlobalApi";
import { SubHeading } from "./SubHeading";
import { useNavigation } from "@react-navigation/native";
import { CategoryItem } from "../CategoryItem";

export function Categories() {
  const navigation = useNavigation();
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
      <SubHeading
        subHeading={"Doctors' Specialities"}
        lightText={"See All"}
        onPress={() =>
          navigation.navigate("SpecialitiesList", { specialities: categories })
        }
      />
      <FlatList
        data={categories}
        numColumns={4}
        columnWrapperStyle={styles.columnWrapperStyle}
        renderItem={({ item, index }) =>
          index < 4 && <CategoryItem key={index} category={item} />
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

  columnWrapperStyle: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
