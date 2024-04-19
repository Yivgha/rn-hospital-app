import { View, Text, StyleSheet, Image } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { SignOutGoogle } from "../AuthScreens/SignOutGoogle";
import Colors from "../../../assets/Shared/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export function Header({ style }) {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <View style={[styles.headerBox, style]}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: user.imageUrl }}
          style={{ width: 45, height: 45, borderRadius: 50 }}
        />
        <Text style={styles.textColor}>{user.fullName}</Text>
      </View>
      <MaterialIcons name="notifications-none" size={30} color={Colors.white} />
      <SignOutGoogle />
    </View>
  );
}

const styles = StyleSheet.create({
  headerBox: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  textColor: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: "appfont",
  },
});
