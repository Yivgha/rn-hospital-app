import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Colors from "../../../assets/Shared/Colors";
import GlobalApi from "../../Services/GlobalApi";
import { SubHeading } from "./SubHeading";
import { useNavigation } from "@react-navigation/native";

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
      <SubHeading subHeading={"Doctors' Specialities"} lightText={"See All"} />
      <FlatList
        data={categories}
        numColumns={4}
        columnWrapperStyle={styles.columnWrapperStyle}
        renderItem={({ item, index }) =>
          index < 4 && (
            <TouchableOpacity
              key={index}
              style={styles.flatListWrapper}
              onPress={() =>
                navigation.navigate("HospitalDoctorsListScreen", {
                  categoryName: item?.attributes.Name,
                  categoryId: item?.id,
                  categoryIcon: item?.attributes.Icon.data.attributes.url,
                })
              }
            >
              <View style={styles.innerWrapper}>
                <Image
                  source={{ uri: item?.attributes.Icon.data.attributes.url }}
                  style={{ height: 30, width: 30 }}
                />
              </View>
              <Text style={styles.categoryText}>{item?.attributes.Name}</Text>
            </TouchableOpacity>
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
