import { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import Colors from "../../assets/Shared/Colors";
import { Header } from "../Components/Home/Header";
import GlobalApi from "../Services/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import { DoctorCardItem } from "../Components/DoctorCardItem";
import { NotificationModal } from "../Components/Home/NotificationModal";

export function Profile() {
  const { user } = useUser();
  const userEmail = user.primaryEmailAddress.emailAddress;

  const [favDoctors, setFavDoctors] = useState([]);
  const [favItems, setFavItems] = useState([]);

  const [userNotifications, setUserNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getFavDoctors = () => {
    GlobalApi.getDoctorFavsByEmail(userEmail)
      .then((res) => {
        setFavDoctors(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  const getFavItems = () => {
    GlobalApi.getUserFavouriteDoctors(userEmail)
      .then((res) => setFavItems(res.data.data))
      .catch((err) => console.log(err));
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
    getFavDoctors();
    getFavItems();
    getNotifications();
  }, []);

  const toggleNotificationModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <SafeAreaView style={styles.homeBox}>
      <Header
        style={{ paddingHorizontal: 10 }}
        toggleNotificationModal={toggleNotificationModal}
        userNotifications={userNotifications}
      />

      <View style={styles.textBox}>
        {!favDoctors?.length ? (
          <Text style={[styles.textColor, styles.additionalInfo]}>
            Nothing here yet
          </Text>
        ) : (
          <Text style={styles.textColor}>Your favourite doctors:</Text>
        )}
        <TouchableOpacity
          onPress={() => {
            getFavDoctors();
            getFavItems();
            getNotifications();
          }}
          style={styles.refreshBtn}
        >
          <Feather name="refresh-cw" size={24} color={Colors.lightGray} />
        </TouchableOpacity>
      </View>

      {favDoctors?.length > 0 && (
        <View style={styles.favDocBox}>
          <FlatList
            data={favDoctors}
            extraData={[favDoctors, favItems, userNotifications]}
            refreshing={false}
            onRefresh={() => {
              getNotifications();
              getFavDoctors();
              getFavItems();
            }}
            horizontal={false}
            scrollEnabled={true}
            maxToRenderPerBatch={5}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListStyles}
            renderItem={({ item }) => (
              <DoctorCardItem doctorInfo={item} favDoctorsList={favDoctors} />
            )}
          />
        </View>
      )}
      {isModalOpen && (
        <NotificationModal
          toggleNotificationModal={toggleNotificationModal}
          isModalOpen={isModalOpen}
          userNotifications={userNotifications}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeBox: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
    gap: 15,
    backgroundColor: Colors.celestial,
    paddingBottom: 115,
  },
  textBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  refreshBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
  },
  favDocBox: {
    flexDirection: "column",
    gap: 15,
  },
  flatListStyles: {
    backgroundColor: Colors.sky,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 10,
  },
  textColor: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: "appfont",
  },
});
