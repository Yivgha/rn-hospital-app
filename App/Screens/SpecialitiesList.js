import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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
      <ScrollView vertical horizontal={false}>
        <View style={styles.innerBox}>
          <PageHeader
            title={"All categories"}
            style={{ color: Colors.white }}
          />

          <FlatList
            horizontal={false}
            scrollEnabled={false}
            contentContainerStyle={{ flexDirection: "column", gap: 15 }}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageBox: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.celestial,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  innerBox: {
    gap: 35,
  },
  flatListWrapper: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
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
