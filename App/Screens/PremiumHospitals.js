import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import Colors from "../../assets/Shared/Colors";
import { PageHeader } from "../Components/PageHeader";
import GlobalApi from "../Services/GlobalApi";
import { useNavigation } from "@react-navigation/native";
import { CustomHospitalInfoBlock } from "../Components/Home/CustomHospitalInfoBlock";
import { MaterialIcons } from "@expo/vector-icons";

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

  const isPremium = premiumHospitals?.attributes?.Premium;

  return (
    <SafeAreaView style={styles.pageBox}>
      <View style={styles.innerBox}>
        <PageHeader title={"Premium Hospitals"} />

        <FlatList
          data={premiumHospitals}
          extraData={premiumHospitals}
          contentContainerStyle={{ gap: 15, width: "100%" }}
          horizontal={false}
          scrollEnabled={true}
          refreshing={false}
          onRefresh={() => fetchHospitals()}
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
                <MaterialIcons
                  name="workspace-premium"
                  size={24}
                  color={Colors.celestial}
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    zIndex: 3,
                  }}
                />

                <Image
                  source={{
                    uri: item?.attributes.Image.data.attributes.url,
                  }}
                  style={styles.hospitalImage}
                />
                <Text style={styles.hospitalCaption}>
                  {item?.attributes.Name}
                </Text>
                <CustomHospitalInfoBlock
                  text={item?.attributes.Address}
                  icon={true}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageBox: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 65,
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
    position: "relative",
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
