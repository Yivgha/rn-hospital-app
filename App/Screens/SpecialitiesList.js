import {
  View,
  Text,
  StyleSheet, 
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Colors from "../../assets/Shared/Colors";
import { PageHeader } from "../Components/PageHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NothingFound } from "../Components/NothingFound";

export function SpecialitiesList() {
  const param = useRoute().params;
  const navigation = useNavigation();

  if (!param.specialities) {
    return <NothingFound />;
  }
  return (
    <View style={styles.pageBox}>
      <View style={styles.innerBox}>
        <PageHeader title={"All categories"} style={{ color: Colors.white }} />

        <FlatList
          horizontal={false}
          scrollEnabled={true}
          contentContainerStyle={styles.flatList}
          data={param.specialities}
          renderItem={({ item, index }) => (
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
                  source={{
                    uri: item?.attributes.Icon.data.attributes.url,
                  }}
                  style={styles.imageStyle}
                />
                <Text style={styles.textColor}>{item?.attributes.Name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageBox: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.celestial,
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 80,
  },
  innerBox: {
    gap: 19,
  },
  flatListWrapper: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
  },
  flatList: {
    flexDirection: "column",
    gap: 15,
    paddingVertical: 5,
  },
  innerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageStyle: {
    height: 50,
    width: 50,
  },
  textColor: {
    fontFamily: "appfontSemibold",
    fontSize: 24,
    color: Colors.celestial,
    textTransform: "uppercase",
  },
});
