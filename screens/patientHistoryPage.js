import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Alert,
  LogBox,
} from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { Icon, SocialIcon, ListItem, Avatar } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as firebase from "firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
LogBox.ignoreAllLogs();

const patientHistory = ({ navigation, route }) => {
  const win = Dimensions.get("window");
  const {
    patientId,
    dateArray,
    patientgender,
    address,
    age,
    name,
    phoneNumber,
    email,
  } = route.params;
  
//   console.log("..............");
//   console.log(dateArray);
// dateArray.reverse();
  const [history, setHistory] = useState("");
  const [CO, setCO] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment1, setTreatment1] = useState("");
  const [dosage1, setDosage1] = useState("");
  const [agee, setagee] = useState("");
  const [treatment2, setTreatment2] = useState("");
  const [dosage2, setDosage2] = useState("");
  const [treatment3, setTreatment3] = useState("");
  const [dosage3, setDosage3] = useState("");
  const [doctorSuggestion, setDoctorSuggestion] = useState("");
  const [modal2, setModal2] = useState(false);

  //date time picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [visitDate, setVisitDate] = useState("");

  const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (event.type == "set") {
      let tempDate = new Date(currentDate);
      let fDate =
        tempDate.getDate() +
        "-" +
        (tempDate.getMonth() + 1) +
        "-" +
        tempDate.getFullYear();
      setVisitDate(fDate);
    } else {
      return;
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  //////////////////////////////////////////////////////////////////////////
  async function newVisit() {
    if (patientId !== "") {
      const dbRef = await firebase.database().ref("patientInfo");
      dbRef
        .child(patientId)
        .get()
        .then(async (snapshot) => {
          if (snapshot.exists()) {
            navigation.navigate("newVisit", {
              patientgender,
              address,
              age,
              patientId,
              name,
              phoneNumber,
              email,
            });
          } else {
            Alert.alert("Alert", "No data exists.", [{ text: "OK" }]);
          }
        });
    } else {
      Alert.alert("Alert", "Id cannot be blank.", [{ text: "OK" }]);
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  async function getDetails() {
    if (visitDate !== "") {
      const dbRef = await firebase.database().ref("patientInfo");
      dbRef
        .child(patientId)
        .child(visitDate)
        .get()
        .then(async (snapshot) => {
          if (snapshot.exists()) {
            dbRef
              .child(patientId)
              .child(visitDate)
              .child("Suggestion")
              .get()
              .then(async (snapshot) => {
                if (snapshot.exists()) {
                  const sugg = await snapshot.val();
                  const Sugg = sugg.toString();
                  setDoctorSuggestion(Sugg);
                } else {
                  const Sugg = "";
                  setDoctorSuggestion(Sugg);
                }
              });
            dbRef
              .child(patientId)
              .child(visitDate)
              .child("visitDate")
              .get()
              .then(async (snapshot) => {
                if (snapshot.exists()) {
                  const visitDate = await snapshot.val();
                  const VisitDate = visitDate.toString();
                  setVisitDate(VisitDate);
                } else {
                  const VisitDate = "";
                  setVisitDate(VisitDate);
                }
              });
              dbRef
              .child(patientId)
              .child(visitDate)
              .child("age")
              .get()
              .then(async (snapshot) => {
                if (snapshot.exists()) {
                  const userage = await snapshot.val();
                  const Userage = userage.toString();
                  setagee(Userage);
                } else {
                  const userage = "";
                  setagee(userage);
                }
              });

            dbRef
              .child(patientId)
              .child(visitDate)
              .child("history")
              .get()
              .then(async (snapshot) => {
                if (snapshot.exists()) {
                  const patientHistory = await snapshot.val();
                  const patienthistory = patientHistory.toString();
                  setHistory(patienthistory);
                } else {
                  const patienthistory = "";
                  setHistory(patienthistory);
                }
              });
            dbRef
              .child(patientId)
              .child(visitDate)
              .child("CO")
              .get()
              .then(async (snapshot) => {
                if (snapshot.exists()) {
                  const co = await snapshot.val();
                  const patientCO = co.toString();
                  setCO(patientCO);
                } else {
                  const patientCO = "";
                  setCO(patientCO);
                }
              });
            dbRef
              .child(patientId)
              .child(visitDate)
              .child("Diagnosis")
              .get()
              .then(async (snapshot) => {
                if (snapshot.exists()) {
                  const diag = await snapshot.val();
                  const patientDiagnosis = diag.toString();
                  setDiagnosis(patientDiagnosis);
                } else {
                  const patientDiagnosis = "";
                  setDiagnosis(patientDiagnosis);
                }
              });
            dbRef
              .child(patientId)
              .child(visitDate)

              .child("treatment1")
              .get()
              .then(async (snapshot) => {
                if (snapshot.exists()) {
                  const treat1 = await snapshot.val();
                  const Treat1 = treat1.toString();
                  setTreatment1(Treat1);
                } else {
                  const Treat1 = "";
                  setTreatment1(Treat1);
                }
              });
            dbRef
              .child(patientId)
              .child(visitDate)
              .child("dosage1")
              .get()
              .then(async (snapshot) => {
                if (snapshot.exists()) {
                  const dose1 = await snapshot.val();
                  const Dose1 = dose1.toString();
                  setDosage1(Dose1);
                } else {
                  const Dose1 = "";
                  setDosage1(Dose1);
                }
              });
            dbRef
              .child(patientId)
              .child(visitDate)
              .child("treatment2")
              .get()
              .then(async (snapshot) => {
                if (snapshot.exists()) {
                  const treat2 = await snapshot.val();
                  const Treat2 = treat2.toString();
                  setTreatment2(Treat2);
                } else {
                  const Treat2 = "";
                  setTreatment2(Treat2);
                }
              });
            dbRef
              .child(patientId)
              .child(visitDate)
              .child("dosage2")
              .get()
              .then(async (snapshot) => {
                if (snapshot.exists()) {
                  const dose2 = await snapshot.val();
                  const Dose2 = dose2.toString();
                  setDosage2(Dose2);
                } else {
                  const Dose2 = "";
                  setDosage2(Dose2);
                }
              });
            dbRef
              .child(patientId)
              .child(visitDate)
              .child("treatment3")
              .get()
              .then(async (snapshot) => {
                if (snapshot.exists()) {
                  const treat3 = await snapshot.val();
                  const Treat3 = treat3.toString();
                  setTreatment3(Treat3);
                } else {
                  const Treat3 = "";
                  setTreatment3(Treat3);
                }
              });
            dbRef
              .child(patientId)
              .child(visitDate)
              .child("dosage3")
              .get()
              .then(async (snapshot) => {
                if (snapshot.exists()) {
                  const dose3 = await snapshot.val();
                  const Dose3 = dose3.toString();
                  setDosage3(Dose3);
                } else {
                  const Dose3 = "";
                  setDosage3(Dose3);
                }
              });
            setModal2(true);
          } else {
            Alert.alert(
              "Alert",
              "No data exists. Please check the visit date carefully",
              [{ text: "OK" }]
            );
          }
        });
    } else {
      Alert.alert("Alert", "Date cannot be blank.", [{ text: "OK" }]);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          width: win.width,
          resizeMode: "contain",
          position: "absolute",
          top: -10,
        }}
        source={require("../assets/images/topbackground.png")}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("searchPage")}>
          <Icon
            name="arrow-left"
            type="font-awesome-5"
            color="white"
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Patient History</Text>
        <TouchableOpacity onPress={() => newVisit()}>
          <Icon
            name="user-plus"
            type="font-awesome-5"
            color="white"
            size={20}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.listCard}>
        <TouchableOpacity onPress={() => showMode("date")}>
          <TextInput
            label="Visit Date"
            value={visitDate}
            mode="outlined"
            style={styles.input}
            editable={false}
            onChange={onChange}
            left={<TextInput.Icon name="calendar-month-outline" color="grey" />}
          />
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <Button
          onPress={() => {
            getDetails();
          }}
          icon="account-search"
          mode="contained"
          style={styles.button}
        >
          Search
        </Button>
        <Text style={styles.subheading}>
          Recent Visits
        </Text>
        <ScrollView>
          <View>
            {dateArray.map((dateArray) => (
              <TouchableOpacity>
                <ListItem key={dateArray} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{dateArray}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <Modal
        animationType="show"
        transparent={true}
        visible={modal2}
        onRequestClose={() => {
          setModal2(false);
        }}
      >
        <View style={styles.modal2}>
          <Button
            mode="contained"
            onPress={() => {
              setModal2(false);
              navigation.navigate("patientDetails", {
                patientgender,
                address,
                agee,
                age,
                patientId,
                name,
                phoneNumber,
                visitDate,
                email,
                history,
                CO,
                diagnosis,
                treatment1,
                dosage1,
                treatment2,
                dosage2,
                treatment3,
                dosage3,
                doctorSuggestion,
              });
            }}
          >
            View Details
          </Button>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: 50,
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
    color: "white",
    marginLeft: 20,
    marginRight: 20,
  },
  datecard: {
    height: 30,
    width: "90%",
    marginTop: 100,
  },
  listCard: {
    marginTop: "50%",
    padding: 20,
    height: 470,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 30,
  },
  button: {
    width: 120,
    // marginLeft: 86,
    padding: 5,
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  modal2: {
    position: "absolute",
    bottom: "4%",
    // left: 96,
    width: "100%",
    alignItems: "center",
  },
  subheading: {
    color: "red",
    fontSize:20,
    marginLeft:5
  }
});

export default patientHistory;
