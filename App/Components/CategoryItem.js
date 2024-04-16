import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../../assets/Shared/Colors";
import { useNavigation } from "@react-navigation/native";

export function CategoryItem({ category }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.flatListWrapper}
      onPress={() =>
        navigation.navigate("HospitalDoctorsListScreen", {
          categoryName: category?.attributes.Name,
          categoryId: category?.id,
          categoryIcon: category?.attributes.Icon.data.attributes.url,
        })
      }
    >
      <View style={styles.innerWrapper}>
        <Image
          source={{ uri: category?.attributes.Icon.data.attributes.url }}
          style={{ height: 30, width: 30 }}
        />
      </View>
      <Text style={styles.categoryText}>{category?.attributes.Name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  categoryText: {
    fontFamily: "appfont",
    color: Colors.peach,
    fontSize: 14,
  },
});
