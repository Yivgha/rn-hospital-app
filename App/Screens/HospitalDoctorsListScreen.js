import { View, Text, StyleSheet } from "react-native";
import Colors from "../../assets/Shared/Colors";
import { useRoute } from "@react-navigation/native";
import { PageHeader } from "../Components/PageHeader";

export function HospitalDoctorsListScreen() {
  const param = useRoute();
  const { categoryName, categoryId } = param?.params;

  return (
    <View style={styles.pageBox}>
      <PageHeader categoryName={categoryName} />
      <Text>This is category id: {categoryId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pageBox: {
    flex: 1,
    flexDirection: "column",
    padding: 15,
    gap: 19,
    backgroundColor: Colors.sky,
  },
});
