import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useState } from "react";
import Colors from "../../../assets/Shared/Colors";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export function Search({ setSearchText }) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <View>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search"
          maxLength={50}
          placeholderTextColor={Colors.peach}
          style={styles.searchInput}
          value={searchValue}
          onChangeText={(value) => {
            setSearchValue(value);
            setSearchText(value);
          }}
          onSubmitEditing={() => {
            setSearchText(searchValue);
            Keyboard.dismiss;
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setSearchText(searchValue);
            Keyboard.dismiss();
          }}
        >
          <Fontisto name="search" size={24} color={Colors.white} />
        </TouchableOpacity>
        {searchValue.length !== 0 && (
          <TouchableOpacity
            onPress={() => {
              setSearchValue("");
              setSearchText("");
              Keyboard.dismiss();
            }}
            style={styles.clearIcon}
          >
            <MaterialIcons name="clear" size={24} color={Colors.white} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    color: Colors.white,
    backgroundColor: Colors.celestial,
    fontSize: 16,
    height: 40,
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 30,
    flexGrow: 2,
    position: "relative",
    fontFamily: "appfont",
  },
  searchBox: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  clearIcon: {
    position: "absolute",
    right: 50,
  },
});
