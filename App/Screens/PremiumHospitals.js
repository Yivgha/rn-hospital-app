import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import Colors from "../../assets/Shared/Colors";
import { PageHeader } from "../Components/PageHeader";
import GlobalApi from "../Services/GlobalApi";
import { useNavigation } from "@react-navigation/native";
import { CustomHospitalInfoBlock } from "../Components/Home/CustomHospitalInfoBlock";

export function PremiumHospitals() {
  const [premiumHospitals, setPremiumHospitals] = useState([]);

  const navigation = useNavigation();

  if (!premiumHospitals) {
    return null;
  }

  const fetchHospitals = () => {
    GlobalApi.getPremiumHospitals().then((res) =>
      setPremiumHospitals(res.data.data)
    );
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  return (
    <View style={styles.pageBox}>
      <ScrollView vertical={true} horizontal={false}>
        <View style={styles.innerBox}>
          <PageHeader title={"Premium Hospitals"} />

          <FlatList
            data={premiumHospitals}
            contentContainerStyle={{ gap: 15, width: "100%" }}
            horizontal={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("HospitalDetails", {
                    hospitalDetails: item,
                  });
                }}
              >
                <View style={styles.hospitalBox}>
                  <Image
                    source={{
                      uri: item?.attributes.Image.data.attributes.url,
                    }}
                    style={styles.hospitalImage}
                  />
                  <Text style={styles.hospitalCaption}>
                    {item?.attributes.Name}
                  </Text>
                  <CustomHospitalInfoBlock text={item?.attributes.Address} />
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
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: Colors.sky,
  },
  innerBox: {
    gap: 15,
  },
  hospitalBox: {
    width: "100%",
    backgroundColor: Colors.white,
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
    paddingBottom: 10,
    borderRadius: 10,
  },
  hospitalImage: {
    width: "100%",
    minHeight: 170,
    borderRadius: 10,
  },
  hospitalCaption: {
    fontFamily: "appfontBold",
    fontSize: 18,
    color: Colors.peach,
    alignSelf: "center",
  },
  infoWrapper: { flexDirection: "row", gap: 5 },
  infoTitle: {
    fontFamily: "appfontSemibold",
    fontSize: 14,
    color: Colors.peach,
  },
  hospitalText: {
    fontFamily: "appfont",
    fontSize: 14,
    color: Colors.celestial,
  },
});
