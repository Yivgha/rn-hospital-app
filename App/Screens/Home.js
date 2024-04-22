import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useState, useCallback, useEffect } from "react";
import Colors from "../../assets/Shared/Colors";
import { Header } from "../Components/Home/Header";
import { Search } from "../Components/Home/Search";
import { Slider } from "../Components/Home/Slider";
import { Categories } from "../Components/Home/Categories";
import { PremiumHospitals } from "../Components/Home/PremiumHospitals";
import { NotificationModal } from "../Components/Home/NotificationModal";
import GlobalApi from "../Services/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import { useFocusEffect } from "@react-navigation/native";

export function Home() {
  const { user } = useUser();
  const userEmail = user.primaryEmailAddress.emailAddress;

  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userNotifications, setUserNotifications] = useState([]);

  const toggleNotificationModal = () => {
    setIsModalOpen(!isModalOpen);
    markNotificationsAsRead();
  };

  const getNotifications = () => {
    GlobalApi.getNotificationsByUserEmail(userEmail)
      .then((res) => {
        const notificationsWithReadProperty = res.data.data.map(
          (notification) => ({
            ...notification,
            read: false,
          })
        );
        setUserNotifications(notificationsWithReadProperty);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const markNotificationsAsRead = () => {
    // Update the 'read' property of each notification object to true
    const updatedNotifications = userNotifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setUserNotifications(updatedNotifications);
  };

  return (
    <SafeAreaView style={styles.homeBox}>
      <Header
        toggleNotificationModal={toggleNotificationModal}
        userNotifications={userNotifications}
      />
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <View style={{ gap: 25 }}>
          <Search setSearchText={setSearchText} searchText={searchText} />

          <Slider />
          <Categories />

          <PremiumHospitals />
        </View>
        {isModalOpen && (
          <NotificationModal
            toggleNotificationModal={toggleNotificationModal}
            isModalOpen={isModalOpen}
            userNotifications={userNotifications}
            markNotificationsAsRead={markNotificationsAsRead}
            getNotifications={getNotifications}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeBox: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 15,
    backgroundColor: Colors.celestial,
  },
});
