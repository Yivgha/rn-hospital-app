import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from "react-native";
import Colors from "../../../assets/Shared/Colors";
import moment from "moment";
import { useUser } from "@clerk/clerk-expo";
import GlobalApi from "../../Services/GlobalApi";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const MAX_LENGTH = 320;

export function BookingSection({ hospital, doctor }) {
  const { user } = useUser();

  const [next7Days, setNext7Days] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  const [timeList, setTimeList] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [maxTypingLength, setMaxTypingLength] = useState(MAX_LENGTH);
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isError, setIsError] = useState(false);

  const getDay = () => {
    const today = moment.parseZone(new Date()).local(true).format();
    setSelectedDay(today);

    const nextSevenDays = [];
    for (let i = 0; i < 7; i++) {
      const date = moment().add(i, "days");
      nextSevenDays.push({
        date: moment.parseZone(date).local(true).format(),
        day: moment.parseZone(date).local(true).format("ddd"),
        formattedDate: moment.parseZone(date).local(true).format("Do MMM"),
      });
    }

    setNext7Days(nextSevenDays);
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 8; i < 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 0; i < 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeList(timeList);
  };

  useEffect(() => {
    getDay();
    getTime();
  }, []);

  const handleMaxLength = (value) => {
    const remainingSymbols = MAX_LENGTH - value.length;
    if (remainingSymbols >= 0) {
      setMaxTypingLength(remainingSymbols);
      setNotes(value);
    }
  };

  const bookAppointment = () => {
    let data = {};
    if (hospital) {
      data = {
        data: {
          hospitals: hospital?.id,
          UserName: user.fullName,
          Email: user.primaryEmailAddress.emailAddress,
          Date: selectedDay,
          Time: selectedTime,
          Note: notes,
        },
      };
    }
    if (doctor) {
      data = {
        data: {
          doctors: doctor?.id,
          UserName: user.fullName,
          Email: user.primaryEmailAddress.emailAddress,
          Date: selectedDay,
          Time: selectedTime,
          Note: notes,
        },
      };
    }

    setIsLoading(true);

    GlobalApi.createAppointment(data)
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          setIsSuccessful(true);
          setTimeout(() => {
            setIsSuccessful(false);
          }, 1500);
        } else {
          setIsLoading(false);
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 1500);
        }
      })
      .catch((err) => console.log(err));

    const userEmail = user.primaryEmailAddress.emailAddress;
    GlobalApi.getUserAppointments(userEmail)
      .then((res) => console.log("refreshed appointments"))
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.box}>
      <Text style={styles.title}>Book Appointment</Text>
      <Text style={styles.captionText}>Day</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 5 }}
        data={next7Days}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayBtn,
              selectedDay === item.date ? styles.activeBtn : styles.inactiveBtn,
            ]}
            onPress={() => {
              setSelectedDay(item.date);
            }}
          >
            <Text
              style={[
                styles.dayBtnText,
                selectedDay === item.date
                  ? styles.activeText
                  : styles.inactiveText,
              ]}
            >
              {item.day}
            </Text>
            <Text
              style={[
                styles.dayBtnText,
                selectedDay === item.date
                  ? styles.activeText
                  : styles.inactiveText,
              ]}
            >
              {item.formattedDate}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.captionText}>Time</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 5 }}
        data={timeList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayBtn,
              selectedTime === item.time
                ? styles.activeBtn
                : styles.inactiveBtn,
            ]}
            onPress={() => {
              console.log("pressed", item.time);
              setSelectedTime(item.time);
            }}
          >
            <Text
              style={[
                styles.dayBtnText,
                selectedTime === item.time
                  ? styles.activeText
                  : styles.inactiveText,
              ]}
            >
              {item.time}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.textAreaTitle}>
        <Text style={styles.captionText}>Note</Text>
        <Text style={styles.textColor}>max length: {maxTypingLength}</Text>
      </View>

      <View style={styles.textAreaBox}>
        <TextInput
          numberOfLines={3}
          multiline={true}
          placeholder="Type additional info here"
          placeholderTextColor={Colors.gray}
          maxLength={320}
          autoGrow
          value={notes}
          style={styles.textInput}
          onChangeText={(value) => handleMaxLength(value)}
        />

        {notes.length > 0 && (
          <TouchableOpacity
            style={{ position: "absolute", bottom: "30%", right: 10 }}
            onPress={() => {
              setMaxTypingLength(MAX_LENGTH);
              setNotes("");
              Keyboard.dismiss();
            }}
          >
            <MaterialIcons name="clear" size={24} color={Colors.gray} />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={styles.bookBtn}
        disabled={isLoading && true}
        onPress={() => {
          bookAppointment();
          setMaxTypingLength(MAX_LENGTH);
          setNotes("");
        }}
      >
        <Text style={styles.bookBtnText}>Submit</Text>
      </TouchableOpacity>
      {!isLoading && isSuccessful === true && (
        <View style={styles.alertBox}>
          <AntDesign name="checkcircle" size={24} color={Colors.success} />
          <Text style={[styles.basicAlertText, { color: Colors.success }]}>
            Submitted
          </Text>
        </View>
      )}
      {!isLoading && isError === true && (
        <View style={styles.alertBox}>
          <MaterialIcons name="error" size={24} color={Colors.error} />
          <Text style={[styles.basicAlertText, { color: Colors.error }]}>
            Something wrong
          </Text>
        </View>
      )}
      {isLoading && (
        <View style={styles.alertBox}>
          <AntDesign name="clockcircleo" size={24} color={Colors.white} />
          <Text style={[styles.basicAlertText, { color: Colors.white }]}>
            Loading
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "column",
    gap: 15,
    position: "relative",
  },
  title: {
    fontFamily: "appfontBold",
    fontSize: 18,
    color: Colors.gray,
  },
  captionText: {
    fontFamily: "appfontSemibold",
    color: Colors.celestial,
    fontSize: 18,
  },
  textColor: {
    fontFamily: "appfont",
    fontSize: 16,
    color: Colors.celestial,
  },
  dayBtn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,

    borderWidth: 1,
    borderRadius: 100,
    padding: 15,
  },
  activeBtn: {
    backgroundColor: Colors.white,
    borderColor: Colors.celestial,
  },
  inactiveBtn: {
    backgroundColor: Colors.lightGray,
    borderColor: Colors.gray,
  },
  dayBtnText: {
    fontFamily: "appfontSemibold",
    fontSize: 14,
  },
  activeText: {
    color: Colors.celestial,
  },
  inactiveText: {
    color: Colors.gray,
  },
  textInput: {
    backgroundColor: Colors.lightGray,
    color: Colors.celestial,
    paddingVertical: 5,
    paddingLeft: 15,
    paddingRight: 30,
    borderRadius: 10,
    fontFamily: "appfont",
    fontSize: 16,
    justifyContent: "flex-start",
    lineHeight: 22,
    maxHeight: 350,
    gap: 3,
  },
  textAreaBox: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    position: "relative",
    width: "100%",
    gap: 10,
  },
  textAreaTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  bookBtn: {
    padding: 10,
    backgroundColor: Colors.celestial,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
  bookBtnText: {
    fontFamily: "appfontSemibold",
    fontSize: 14,
    color: Colors.white,
  },
  alertBox: {
    position: "absolute",
    bottom: 60,
    flexDirection: "row",
    backgroundColor: Colors.gray,
    padding: 15,
    width: Dimensions.get("screen").width * 0.5,
    paddingHorizontal: "auto",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    alignSelf: "center",
    borderColor: Colors.gray,
  },
  basicAlertText: {
    fontFamily: "appfontSemibold",
    fontSize: 16,
  },
});
