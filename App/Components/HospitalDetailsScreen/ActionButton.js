import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../../assets/Shared/Colors";

export function ActionButton({ toggleModal, setActionContentType }) {
  const actionButtonList = [
    {
      id: 1,
      name: "Phone",
      icon: "phone",
    },
    {
      id: 2,
      name: "Email",
      icon: "mail",
    },
    {
      id: 3,
      name: "Website",
      icon: "earth",
    },
    {
      id: 4,
      name: "Location",
      icon: "enviromento",
    },
    {
      id: 5,
      name: "Share",
      icon: "sharealt",
    },
  ];
  return (
    <View>
      <FlatList
        numColumns={5}
        columnWrapperStyle={{ flex: 1, justifyContent: "space-between" }}
        scrollEnabled={false}
        data={actionButtonList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setActionContentType(item.name);
              toggleModal();
            }}
          >
            <View style={styles.listBox}>
              <AntDesign size={18} name={item.icon} color={Colors.celestial} />
              <Text style={styles.textColor}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listBox: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.celestial,
    padding: 10,
    borderRadius: 100,
    minWidth: 55,
  },
  textColor: {
    fontFamily: "appfont",
    fontSize: 11,
    color: Colors.celestial,
  },
});
