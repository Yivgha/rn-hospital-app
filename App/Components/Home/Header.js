import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { SignOutGoogle } from "../AuthScreens/SignOutGoogle";
import Colors from "../../../assets/Shared/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export function Header({ style, toggleNotificationModal, userNotifications }) {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const unreadNotificationsCount = userNotifications?.reduce(
    (count, notification) => (notification.read ? count : count + 1),
    0
  );

  return (
    <View style={[styles.headerBox, style]}>
      <View style={styles.userInfo}>
        <Image source={{ uri: user.imageUrl }} style={styles.avatarImg} />
        <Text style={styles.textColor}>{user.fullName}</Text>
      </View>
      <TouchableOpacity onPress={toggleNotificationModal}>
        <View style={{ position: "relative" }}>
          <MaterialIcons
            name="notifications-none"
            size={30}
            color={Colors.white}
          />
          {unreadNotificationsCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>
                {unreadNotificationsCount}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
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
  avatarImg: { width: 45, height: 45, borderRadius: 50 },
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
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: Colors.error,
    width: 20,
    height: 20,
    padding: 3,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    fontFamily: "appfont",
    fontSize: 10,
    color: Colors.white,
  },
});
