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

const searchPatient = ({ navigation }) => {
  const win = Dimensions.get("window");
  const [Id, setId] = useState("");
  const [Id2, setId2] = useState("");
  const [patientgender, setpatientgender] = useState("");
  const [address, setaddress] = useState("");
  const [age, setage] = useState("");
  const [patientId, setpatientId] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [email, setEmail] = useState("");
  const [history, setHistory] = useState("");
  const [CO, setCO] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment1, setTreatment1] = useState("");
  const [dosage1, setDosage1] = useState("");
  const [treatment2, setTreatment2] = useState("");
  const [dosage2, setDosage2] = useState("");
  const [treatment3, setTreatment3] = useState("");
  const [dosage3, setDosage3] = useState("");
  const [doctorSuggestion, setDoctorSuggestion] = useState("");
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  //date time picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [visitDatee, setVisitDatee] = useState("");
  const [visitTimee, setVisitTimee] = useState("");

  const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if(event.type == "set") {
      let tempDate = new Date(currentDate);
      let fDate =
        tempDate.getDate() +
        "-" +
        (tempDate.getMonth() + 1) +
        "-" +
        tempDate.getFullYear();
      let ftime = tempDate.getHours() + ":" + tempDate.getMinutes();
      setVisitDatee(fDate);
      setVisitTimee(ftime);
  } else {
      return;
  } 
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  async function newVisit() {
    if(Id!==""){
    const dbRef = await firebase.database().ref("patientInfo");
    dbRef
      .child(Id)
      .get()
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          await dbRef
            .child(Id)
            .child("Gender")
            .get()
            .then((snapshot) => {
              if (snapshot.exists()) {
              const patientGender = snapshot.val();
              const patientgender = patientGender.toString();
              setpatientgender(patientgender);
              }
            });
          dbRef
            .child(Id)
            .child("address")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const address = await snapshot.val();
              const Address = address.toString();
              setaddress(Address);
              }
            });
          dbRef
            .child(Id)
            .child("age")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const age = await snapshot.val();
              const patientAge = age.toString();
              setage(patientAge);
              }
            });
          dbRef
            .child(Id)
            .child("id")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const patientId = await snapshot.val();
              const PatientId = patientId.toString();
              setpatientId(PatientId);
              }
            });
          dbRef
            .child(Id)
            .child("patientName")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const patientName = await snapshot.val();
              const PatientName = patientName.toString();
              setName(PatientName);
              }
            });
          dbRef
            .child(Id)
            .child("phoneNumber")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const phoneNumber = await snapshot.val();
              const PhoneNumber = phoneNumber.toString();
              setPhoneNumber(PhoneNumber);
              }
            });
          dbRef
            .child(Id)
            .child("Email")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const patientEmail = await snapshot.val();
              const patientemail = patientEmail.toString();
              setEmail(patientemail);
              }
            });

          setModal(true);
        } else {
          Alert.alert("Alert", "No data exists.", [{ text: "OK" }]);
        }
      });
    }
    else{
      Alert.alert("Alert", "Id cannot be blank.", [{ text: "OK" }]);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////

  async function getData() {
    if(Id2!==""&&visitDatee!==""&&visitTimee!==""){
    const dbRef = await firebase.database().ref("patientInfo");
    dbRef
      .child(Id2)
      .child(visitDatee)
      .child(visitTimee)
      .get()
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          await dbRef
            .child(Id2)
            .child(visitDatee)
            .child(visitTimee)
            .child("Gender")
            .get()
            .then((snapshot) => {
              if (snapshot.exists()) {
              const patientGender = snapshot.val();
              const patientgender = patientGender.toString();
              setpatientgender(patientgender);
              }
              else{
              const patientgender = ""
              setpatientgender(patientgender);
              }
            });
          dbRef
            .child(Id2)
            .child(visitDatee)
            .child(visitTimee)
            .child("address")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const address = await snapshot.val();
              const Address = address.toString();
              setaddress(Address);
              }
              else{
                const Address = "";
              setaddress(Address);
              }
            });
          dbRef
            .child(Id2)
            .child(visitDatee)
            .child(visitTimee)
            .child("age")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const age = await snapshot.val();
              const patientAge = age.toString();
              setage(patientAge);
              }
              else{
                const patientAge =""
              setage(patientAge);
              }
            });
          dbRef
            .child(Id2)
            .child(visitDatee)
            .child(visitTimee)
            .child("id")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const patientId = await snapshot.val();
              const PatientId = patientId.toString();
              setpatientId(PatientId);
              }
              else{
                const PatientId = ""
              setpatientId(PatientId);
              }
            });
          dbRef
            .child(Id2)
            .child(visitDatee)
            .child(visitTimee)
            .child("patientName")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const patientName = await snapshot.val();
              const PatientName = patientName.toString();
              setName(PatientName);
              }
              else{
              const PatientName = ""
              setName(PatientName);
              }
            });
          dbRef
            .child(Id2)
            .child(visitDatee)
            .child(visitTimee)
            .child("phoneNumber")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const phoneNumber = await snapshot.val();
              const PhoneNumber = phoneNumber.toString();
              setPhoneNumber(PhoneNumber);
              }
              else{
              const PhoneNumber = ""
              setPhoneNumber(PhoneNumber);
              }
            });
            dbRef
            .child(Id2)
            .child(visitDatee)
            .child(visitTimee)
            .child("Suggestion")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const sugg = await snapshot.val();
              const Sugg = sugg.toString();
              setDoctorSuggestion(Sugg);
              }
              else{
                const Sugg = ""
              setDoctorSuggestion(Sugg);
              }
            });
          dbRef
            .child(Id2)
            .child(visitDatee)
            .child(visitTimee)
            .child("visitDate")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const visitDate = await snapshot.val();
              const VisitDate = visitDate.toString();
              setVisitDate(VisitDate);
              }
              else{
                const VisitDate = ""
              setVisitDate(VisitDate);
              }
            });
            dbRef
            .child(Id2)
            .child(visitDatee)
            .child(visitTimee)
            .child("visitTime")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const visitTime = await snapshot.val();
              const VisitTime = visitTime.toString();
              setVisitTime(VisitTime);
              }
              else{
                const VisitTime = ""
              setVisitTime(VisitTime);
              }
            });
          dbRef
            .child(Id2)
            .child(visitDatee)
            .child(visitTimee)
            .child("Email")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const patientEmail = await snapshot.val();
              const patientemail = patientEmail.toString();
              setEmail(patientemail);
              }
              else{
                const patientemail = ""
              setEmail(patientemail);
              }
            });
          dbRef
            .child(Id2)
            .child(visitDatee)
            .child(visitTimee)
            .child("history")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const patientHistory = await snapshot.val();
              const patienthistory = patientHistory.toString();
              setHistory(patienthistory);
              }
              else{
                const patienthistory = "";
                setHistory(patienthistory);
              }
            });
          dbRef
            .child(Id2)
            .child(visitDatee)
            .child(visitTimee)
            .child("CO")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const co = await snapshot.val();
              const patientCO = co.toString();
              setCO(patientCO);
              }
              else{
                const patientCO = ""
              setCO(patientCO);
              }
            });
          dbRef
            .child(Id2)
            .child(visitDatee)
            .child(visitTimee)
            .child("Diagnosis")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const diag = await snapshot.val();
              const patientDiagnosis = diag.toString();
              setDiagnosis(patientDiagnosis);
              }
              else{
                const patientDiagnosis = ""
                setDiagnosis(patientDiagnosis);
              }
            });
          dbRef
            .child(Id2)
            .child(visitDatee)
            .child(visitTimee)
            .child("treatment1")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const treat1 = await snapshot.val();
              const Treat1 = treat1.toString();
              setTreatment1(Treat1);
              }
              else{
                const Treat1 = ""
              setTreatment1(Treat1);
              }
            });
          dbRef
            .child(Id2)
            .child(visitDate)
            .child(visitTime)
            .child("dosage1")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const dose1 = await snapshot.val();
              const Dose1 = dose1.toString();
              setDosage1(Dose1);
              }
              else{
                const Dose1 = ""
              setDosage1(Dose1);
              }
            });
          dbRef
            .child(Id2)
            .child(visitDatee)
            .child(visitTimee)
            .child("treatment2")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const treat2 = await snapshot.val();
              const Treat2 = treat2.toString();
              setTreatment2(Treat2);
              }
              else{
                const Treat2 = ""
              setTreatment2(Treat2);
              }
            });
          dbRef
            .child(Id2)
            .child(visitDatee)
            .child(visitTimee)
            .child("dosage2")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const dose2 = await snapshot.val();
              const Dose2 = dose2.toString();
              setDosage2(Dose2);
              }
              else{
                const Dose2 = ""
              setDosage2(Dose2);
              }
            });
            dbRef
            .child(Id2)
            .child(visitDatee)
            .child(visitTimee)
            .child("treatment3")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const treat3 = await snapshot.val();
              const Treat3 = treat3.toString();
              setTreatment3(Treat3);
              }
              else{
              const Treat3 = ""
              setTreatment3(Treat3);
              }
            });
            dbRef
            .child(Id2)
            .child(visitDatee)
            .child(visitTimee)
            .child("dosage3")
            .get()
            .then(async (snapshot) => {
              if (snapshot.exists()) {
              const dose3 = await snapshot.val();
              const Dose3 = dose3.toString();
              setDosage3(Dose3);
              }
              else{
                const Dose3 = ""
              setDosage3(Dose3);
              }
            });
          setModal2(true);
        } else {
          Alert.alert("Alert", "No data exists. Please check the inputs carefully", [{ text: "OK" }]);
        }
      });
    }
    else{
      Alert.alert("Alert", "Inputs cannot be blank.", [{ text: "OK" }]);
    }
  }

  useEffect(() => {
    LogBox.ignoreLogs(["Reference.child failed"]);
  }, []);
  /////////////////////////////////////////////////////////////////////////////////

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
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon
            name="arrow-left"
            type="font-awesome-5"
            color="white"
            style={styles.back}
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Existing Patient</Text>
      </View>
      <Card style={styles.card}>
      <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={200}>
      <Text style={styles.detailsText}>New Visit</Text>
        <TextInput
          label="Enter Patient Id"
          keyboardType="number-pad"
          value={Id}
          onChangeText={(text) => setId(text)}
          mode="outlined"
          style={styles.input}
        />
        <Button
          onPress={() => {
            newVisit();
          }}
          icon="account-search"
          mode="contained"
          style={styles.button}
        >
          Add
        </Button>
        <Modal
        animationType="show"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <View style={styles.modal}>
          <Button
            mode="contained"
            onPress={() => {
              setModal(false);
              navigation.navigate("newVisit", {
                patientgender,
                address,
                age,
                patientId,
                name,
                phoneNumber,
                email,
              });
            }}
          >
            View Details
          </Button>
        </View>
      </Modal>
      <Text style={styles.detailsText}>Patient History</Text>
        <TextInput
          label="Enter Patient Id"
          keyboardType="number-pad"
          value={Id2}
          onChangeText={(text) => setId2(text)}
          mode="outlined"
          style={styles.input}
        />
        <TouchableOpacity onPress={() => showMode("date")}>
            <TextInput
              label="Visit Date"
              value={visitDatee}
              mode="outlined"
              style={styles.input}
              editable={false}
              onChange={onChange}
              left={
                <TextInput.Icon name="calendar-month-outline" color="grey" />
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showMode("time")}>
            <TextInput
              label="Visit Time"
              value={visitTimee}
              mode="outlined"
              style={styles.input}
              onChange={onChange}
              editable={false}
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
            getData();
          }}
          icon="account-search"
          mode="contained"
          style={styles.button}
        >
          Search
        </Button>
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
                age,
                patientId,
                name,
                phoneNumber,
                visitDate,
                visitTime,
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
                doctorSuggestion
              });
            }}
          >
            View Details
          </Button>
        </View>
      </Modal>
      </KeyboardAwareScrollView>
      </Card>
     
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
    marginLeft: 40,
    marginRight: 30,
  },
  detailsText: {
    fontFamily: "Salsa-Regular",
    fontSize: 25,
    lineHeight: 31,
    color: "red",
    marginTop: "7%",
    marginBottom: "5%",
  },
  input: {
    margin: 15,
    elevation: 5,
  },
  card: {
    width: "90%",
    borderRadius: 20,
    height:470,
    position: "absolute",
    top: 170,
    padding: 15,
  },
  button: {
    width: 120,
    // marginLeft: 86,
    padding: 5,
    marginTop: 20,
    marginBottom: 30,
    alignItems:"center",
    marginLeft:"auto",
    marginRight:"auto"
  },
  modal: {
    position: "absolute",
    bottom: "4%",
    // left: 96,
    width: "100%",
    alignItems: "center",
  },
  modal2: {
    position: "absolute",
    bottom: "4%",
    // left: 96,
    width: "100%",
    alignItems: "center",
  },
});

export default searchPatient;
